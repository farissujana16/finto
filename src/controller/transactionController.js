const transactionService = require("../service/transactionService");
async function getAll(req, res) {
  try {
    const { category, account, type, startDate, endDate, search, page, limit } =
      req.query;

    const data = await transactionService.getAll(req.user.id, {
      category,
      account,
      type,
      startDate,
      endDate,
      search,
      page,
      limit,
    });
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function create(req, res) {
  try {
    const data = await transactionService.create(req.body);
    res.status(201).json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function update(req, res) {
  try {
    await transactionService.update(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function remove(req, res) {
  try {
    await transactionService.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function findId(req, res) {
  try {
    const data = await transactionService.findId(req.params.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports = { getAll, create, update, remove, findId };
