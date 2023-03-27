const { Device, DeviceInfo } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const BadRequestError = require('../utils/errors/BadRequestError');

const create = async (req, res, next) => {
    try{
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({name, price, brandId, typeId, img: fileName});

      if(info){
        info = JSON.parse(info);
        info.forEach(item => 
            DeviceInfo.create({
                title: item.title,
                description: item.description,
                deviceId: device.id
            })
        )
      }

      
      return res.json(device);
    }catch(e){
        next(new BadRequestError(e.message));
    }
    
    
};

const getAll = async (req, res, next) => {
    try{
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = limit * page - limit;
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset});
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});            
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset});             
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});           
        }
        return res.json(devices);

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
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
            );
        res.json(device);
    }catch(e){
        next(new BadRequestError(e.message));
    }        
};

module.exports = {create, getAll, remove, getOne};