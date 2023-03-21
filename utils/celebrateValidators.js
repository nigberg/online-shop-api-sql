const { celebrate, Joi } = require('celebrate');
const validateURL = require('./validateUrl');

module.exports.addProductValidator = celebrate({
  body: Joi.object().keys({
    description: Joi.string().required(),
    title: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    image: Joi.string().custom(validateURL).required(),
  }),
});

module.exports.removeProductValidator = celebrate({
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});
