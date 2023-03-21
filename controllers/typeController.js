const { Type } = require('../models/models');

const create = async (req, res, next) => {
    const { name } = req.body;
    const type = await Type.create({name});
    return res.json(type);
    
};

const getAll = async (req, res, next) => {
    
};

const remove = async (req, res, next) => {
    
};

module.exports = {create, getAll, remove};