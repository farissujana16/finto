const dashboardService = require("../service/dashboardService");
async function getAll(req, res) {
  try {
    const data = await dashboardService.getAll(req.user.id);
    res.json({ message: "Success", data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = { getAll };
