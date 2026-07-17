const Transaction = require("../models/transactionModels");
const Categories = require("../models/categoriesModels");
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
  return await Transaction.create(p);
}
async function update(id, p) {
  return await Transaction.update(p, { where: { id } });
}
async function remove(id) {
  return await Transaction.destroy({ where: { id } });
}
async function findId(id) {
  return await Transaction.findOne({ where: { id } });
}
module.exports = { getAll, create, update, remove, findId };
