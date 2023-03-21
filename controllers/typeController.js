const { Type } = require('../models/models');

const create = async (req, res, next) => {
    const { name } = req.body;
    const type = await Type.create({name});
    return res.json(type);
    
};

const getAll = async (req, res, next) => {
    const types = await Type.findAll();
    return res.json(types);
};

const remove = async (req, res, next) => {
    const { id } = req.params;
    const type = await Type.destroy({ where: {id} });
    return res.json(type);    
};

module.exports = {create, getAll, remove};