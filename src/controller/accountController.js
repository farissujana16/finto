const accountService = require("../service/accountService");
async function getAll(req, res) {
  try {
    const data = await accountService.getAll(req.user.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function create(req, res) {
  try {
    const data = await accountService.create(req.body);
    res.status(201).json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function update(req, res) {
  try {
    await accountService.update(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function remove(req, res) {
  try {
    await accountService.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function findId(req, res) {
  try {
    const data = await accountService.findId(req.params.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports = { getAll, create, update, remove, findId };
