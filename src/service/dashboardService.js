const User = require("../models/userModels");
const Account = require("../models/accountModels");
const Categories = require("../models/categoriesModels");
const Budget = require("../models/budgetModels");
const Transaction = require("../models/transactionModels"); // Sesuaikan path model Anda
const { Op } = require("sequelize");

async function getAll(userId) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Di JS, bulan dimulai dari 0
  const currentYear = today.getFullYear();

  try {
    // 1. Eksekusi semua query secara paralel untuk kecepatan maksimal
    const [user, accounts, budgets, recentTransactions] = await Promise.all([
      // Ambil profil user
      User.findOne({
        where: { id: userId },
        attributes: ["name"],
      }),

      // Ambil daftar akun & saldo berjalan
      Account.findAll({
        where: { userId },
        // attributes: ["id", "name", "type", "balance", "colorOne", ""],
      }),

      // Ambil master budget user bulan ini
      Budget.findAll({
        where: {
          userId,
          period_month: currentMonth,
          period_year: currentYear,
        },
      }),

      // Ambil 3 transaksi terakhir beserta relasi kategorinya
      Transaction.findAll({
        where: { userId },
        limit: 3,
        order: [
          ["transaction_date", "DESC"],
          ["id", "DESC"],
        ],
        include: [
          {
            model: Categories,
            attributes: ["name", "icon", "color"],
            as: "category",
          },
        ],
      }),
    ]);

    // Jika user tidak ditemukan, lempar error
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    // --- 2. LOGIKA PROSES & AGREGASI DATA ---

    // A. Hitung Total Saldo (Sum dari semua akun)
    const totalBalance = accounts.reduce(
      (sum, acc) => sum + parseFloat(acc.balance || 0),
      0,
    );

    // B. Tentukan Sapaan Dinamis (Greeting) berdasarkan waktu server
    const hour = today.getHours();
    let greeting = "Selamat Malam";
    if (hour >= 5 && hour < 11) greeting = "Selamat Pagi";
    else if (hour >= 11 && hour < 15) greeting = "Selamat Siang";
    else if (hour >= 15 && hour < 18) greeting = "Selamat Sore";

    // C. Hitung Realisasi Budget (Jumlahkan transaksi tipe 'expense' bulan ini)
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const totalSpentThisMonth =
      (await Transaction.sum("amount", {
        where: {
          userId,
          type: "expense",
          transaction_date: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      })) || 0;

    const totalBudgetLimit = budgets.reduce(
      (sum, b) => sum + parseFloat(b.limitAmount || 0),
      0,
    );
    const remainingBudget = Math.max(0, totalBudgetLimit - totalSpentThisMonth);
    const percentageUsed =
      totalBudgetLimit > 0
        ? Math.round((totalSpentThisMonth / totalBudgetLimit) * 100)
        : 0;

    // D. Format daftar transaksi agar siap konsumsi oleh Flutter
    const formattedTransactions = recentTransactions.map((t) => {
      const tDate = new Date(t.transaction_date);
      let dateLabel = t.transaction_date; // Default fallback

      // Kalkulasi selisih hari untuk label "Hari Ini" atau "Kemarin"
      const diffTime = today.setHours(0, 0, 0, 0) - tDate.setHours(0, 0, 0, 0);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) dateLabel = "Hari Ini";
      else if (diffDays === 1) dateLabel = "Kemarin";

      return {
        id: t.id,
        title: t.description || t.category?.name || "Transaksi",
        category_name: t.category?.name || "Lain-lain",
        amount: parseFloat(t.amount),
        type: t.type,
        time: new Date(t.transactionDate).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        dateLabel: dateLabel,
        categoryIcon: t.category?.icon || "help_outline",
        categoryColor: t.category?.color || "#95A5A6",
      };
    });

    // --- 3. RETURN DATA SESUAI DESAIN JSON ---
    return {
      user: {
        full_name: user.full_name,
        greeting: greeting,
      },
      balanceSummary: {
        totalBalance: totalBalance,
        changePercentage: 2.4, // Anda bisa buat fungsi dinamis dibanding bulan lalu jika diperlukan
        trend: "up",
        lastUpdated: today.toISOString(),
      },
      myAccounts: accounts.map((acc) => ({
        id: acc.id,
        name: acc.name,
        type: acc.type,
        balance: parseFloat(acc.balance),
        // Siasati mapping icon dinamis berdasarkan nama/tipe akun di Flutter
        icon:
          acc.type === "bank" ? "account_balance" : "account_balance_wallet",
        colorOne: acc.colorOne,
        colorTwo: acc.colorTwo,
      })),
      monthlyBudget: {
        totalBudgetLimit: parseFloat(totalBudgetLimit),
        spentAmount: parseFloat(totalSpentThisMonth),
        remainingAmount: parseFloat(remainingBudget),
        percentageUsed: percentageUsed,
      },
      recentTransactions: formattedTransactions,
    };
  } catch (error) {
    console.error("Error pada Dashboard Service:", error);
    throw error;
  }
}

module.exports = {
  getAll,
};
