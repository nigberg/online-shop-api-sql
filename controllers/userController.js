const NotFoundError = require('../utils/errors/NotFoundError');
const registration = (req, res, next) => {
    
};

const login = (req, res, next) => {
    
};

const getCurrentUserInfo = (req, res, next) => {
    const { id } = req.query;
    if(!id){
        const error = new NotFoundError("Id required!!!");
        return next(error);
    }
    res.send({mess: id});
    
};

module.exports = {registration, login, getCurrentUserInfo};