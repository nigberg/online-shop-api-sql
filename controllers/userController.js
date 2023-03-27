const NotFoundError = require('../utils/errors/NotFoundError');
const AuthorizationError = require('../utils/errors/AuthorizationError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_JWT} = process.env;
const {User, Basket} = require('../models/models');

const registration = async (req, res, next) => {
    const {email, password, role='user'} = req.body;
    if(!email || !password){
        return next(new BadRequestError('Missing required data'));
    }
    const existingUser = await User.findOne({where: {email}});
    if(existingUser){
        return next(new ConflictError('User with provided email already exists'));
    }
    const hash = await bcrypt.hash(password, 5);
    const user = await User.create({email, role, password: hash});
    const basket = await Basket.create({userId: user.id});
    const token = jwt.sign({id: user.id, email, role}, SECRET_JWT, {expiresIn: '7d'});
    return res.json({token});
    
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user){
        return next(new AuthorizationError("Incorrect email or password"));        
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword){
        return next(new AuthorizationError("Incorrect email or password"));
    }
    const token = jwt.sign({id: user.id, email, role: user.role}, SECRET_JWT, {expiresIn: '7d'});
    return res.json({token});    
};

const getCurrentUserInfo = async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findOne({where: {id}});
    if(!user){
        return next(new NotFoundError("User not found"));
    }
    res.json({user});
    
};

module.exports = {registration, login, getCurrentUserInfo};