const Account = require("../models/accountModels");
async function getAll(userId) {
  return await Account.findAll({ where: { userId } });
}
async function create(p) {
  return await Account.create(p);
}
async function update(id, p) {
  return await Account.update(p, { where: { id } });
}
async function remove(id) {
  return await Account.destroy({ where: { id } });
}
async function findId(id) {
  return await Account.findOne({ where: { id } });
}
module.exports = { getAll, create, update, remove, findId };
