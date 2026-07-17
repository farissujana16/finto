const goalService = require("../service/goalService");
async function getAll(req, res) {
  try {
    const data = await goalService.getAll(req.user.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function create(req, res) {
  try {
    const data = await goalService.create(req.body);
    res.status(201).json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function update(req, res) {
  try {
    await goalService.update(req.params.id, req.body);
    res.json({ message: "Updated" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function remove(req, res) {
  try {
    await goalService.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
async function findId(req, res) {
  try {
    const data = await goalService.findId(req.params.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
module.exports = { getAll, create, update, remove, findId };
