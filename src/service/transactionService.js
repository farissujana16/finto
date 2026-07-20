const Transaction = require("../models/transactionModels");
const Categories = require("../models/categoriesModels");
const Account = require("../models/accountModels");
const sequelize = require("../config/database");
const { where } = require("sequelize");
async function getAll(userId) {
  return await Transaction.findAll({
    where: { userId },
    include: [
      {
        model: Categories,
        attributes: ["name", "icon", "color"],
        as: "category",
      },
    ],
  });
}

async function create(p) {
  const t = await sequelize.transaction();
  try {
    const newTransaction = await Transaction.create(p, { transaction: t });

    if (p.type === "transfer") {
      if (!p.to_account_id) {
        throw new Error(
          "Akun tujuan (to_account_id) wajib diisi untuk tipe transfer.",
        );
      }
      if (parseInt(p.accountId) === parseInt(toAccountId)) {
        throw new Error("Akun asal dan akun tujuan tidak boleh sama.");
      }

      // Proteksi Saldo: Cek apakah saldo akun asal mencukupi
      const sourceAccount = await Account.findByPk(p.account_id, {
        transaction: t,
      });
      if (
        !sourceAccount ||
        parseFloat(sourceAccount.balance) < parseFloat(p.amount)
      ) {
        throw new Error("Saldo tidak mencukupi untuk melakukan transfer.");
      }

      await Account.decrement("balance", {
        by: p.amount,
        where: { id: p.accountId },
        transaction: t,
      });

      // B. Tambah saldo ke akun tujuan (to_account_id)
      await Account.increment("balance", {
        by: p.amount,
        where: { id: p.toAccountId },
        transaction: t,
      });
    } else if (p.type === "expense") {
      await Account.decrement("balance", {
        by: p.amount,
        where: { id: p.accountId },
        transaction: t,
      });
    } else if (p.type === "income") {
      await Account.increment("balance", {
        by: p.amount,
        where: { id: p.accountId },
        transaction: t,
      });
    } else {
      throw new Error("Tipe transaksi tidak valid.");
    }
    await t.commit();
    return newTransaction;
  } catch (error) {
    await t.rollback();
    console.error("Transaksi dibatalkan karena error:", error.message);
    throw error;
  }
  // return await Transaction.create(p);
}

async function update(id, p) {
  return await Transaction.update(p, { where: { id } });
}

async function remove(id) {
  const t = await sequelize.transaction();
  try {
    const oldTrans = await Transaction.findOne({
      where: { id },
      transaction: t,
    });

    if (!oldTrans) {
      throw new Error("Transaksi tidak ditemukan");
    }

    // KEMBALIKAN SALDO

    if (oldTrans.type === "transfer") {
      await Account.increment("balance", {
        by: oldTrans.amount,
        where: { id: oldTrans.accountId },
        transaction: t,
      });
      await Account.decrement("balance", {
        by: oldTrans.amount,
        where: { id: oldTrans.toAccountId },
        transaction: t,
      });
    } else if (oldTrans.type === "expense") {
      await Account.increment("balance", {
        by: oldTrans.amount,
        where: { id: oldTrans.accountId },
        transaction: t,
      });
    } else if (oldTrans.type === "income") {
      await Account.decrement("balance", {
        by: oldTrans.amount,
        where: { id: oldTrans.accountId },
        transaction: t,
      });
    }
    await Transaction.destroy({ where: { id } });
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.error("Gagal hapus data karena error:", error.message);
    throw error;
  }
}

async function findId(id) {
  return await Transaction.findOne({ where: { id } });
}

module.exports = { getAll, create, update, remove, findId };
