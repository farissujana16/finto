const Categories = require('../models/categoriesModels');
async function getAll() { return await Categories.findAll(); }
async function create(p) { return await Categories.create(p); }
async function update(id, p) { return await Categories.update(p, { where: { id } }); }
async function remove(id) { return await Categories.destroy({ where: { id } }); }
async function findId(id) { return await Categories.findOne({ where: { id } }); }
module.exports = { getAll, create, update, remove, findId };