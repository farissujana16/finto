const Budget = require("../models/budgetModels");
async function getAll(userId) {
  return await Budget.findAll({ where: { userId } });
}
async function create(p) {
  return await Budget.create(p);
}
async function update(id, p) {
  return await Budget.update(p, { where: { id } });
}
async function remove(id) {
  return await Budget.destroy({ where: { id } });
}
async function findId(id) {
  return await Budget.findOne({ where: { id } });
}
module.exports = { getAll, create, update, remove, findId };
