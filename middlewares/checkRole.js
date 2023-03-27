const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/errors/AuthorizationError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const SECRET_JWT = process.env.SECRET_JWT;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new AuthorizationError('Authorization required');
    next(err);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_JWT);
  } catch (err) {
    next(err);
  }  
  if(payload.role !== 'admin'){
    next(new ForbiddenError('You have no permissions for this action'));
  }
  next();
};
