const { Device } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const BadRequestError = require('../utils/errors/BadRequestError');

const create = async (req, res, next) => {
    try{
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const device = await Device.create({name, price, brandId, typeId, img: fileName});
      return res.json(device);
    }catch(e){
        next(new BadRequestError(e.message));
    }
    
    
};

const getAll = async (req, res, next) => {
    try{
        const devices = await Device.findAll();
        res.json(devices);

    }catch(e){
        next(new BadRequestError(e.message));
    }
        
};

const remove = async (req, res, next) => {
    try{
        const id = req.params.id;
        const device = await Device.destroy({where: {id}});
        res.json(device);
    }catch(e){
        next(new BadRequestError(e.message));
    }
        
};

const getOne = async (req, res, next) => {
    try{
        const id = req.params.id;
        const device = await Device.findOne({where: {id}});
        res.json(device);
    }catch(e){
        next(new BadRequestError(e.message));
    }        
};

module.exports = {create, getAll, remove, getOne};