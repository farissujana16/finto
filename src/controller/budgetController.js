const budgetService = require("../service/budgetService");
async function getAll(req, res) {
  try {
    const data = await budgetService.getAll(req.user.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function create(req, res) {
  try {
    const data = await budgetService.create(req.body);
    res.status(201).json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function update(req, res) {
  try {
    await budgetService.update(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function remove(req, res) {
  try {
    await budgetService.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function findId(req, res) {
  try {
    const data = await budgetService.findId(req.params.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports = { getAll, create, update, remove, findId };
