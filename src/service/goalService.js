const Goal = require("../models/goalModels");
async function getAll(userId) {
  return await Goal.findAll({ where: { userId } });
}
async function create(p) {
  return await Goal.create(p);
}
async function update(id, p) {
  return await Goal.update(p, { where: { id } });
}
async function remove(id) {
  return await Goal.destroy({ where: { id } });
}
async function findId(id) {
  return await Goal.findOne({ where: { id } });
}
module.exports = { getAll, create, update, remove, findId };
