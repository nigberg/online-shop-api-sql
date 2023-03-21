const { Brand } = require('../models/models');

const create = async (req, res, next) => {
    const { name } = req.body;
    const brand = await Brand.create({name});
    return res.json(brand);
};

const getAll = async (req, res, next) => {
    const brands = await Brand.findAll();
    return res.json(brands);
};

const remove = async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.destroy({ where: {id} });
    return res.json(brand);
};

module.exports = { create, getAll, remove };