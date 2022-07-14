const Joi = require("joi");

//проверяет на наличие свойств (name, email, phone)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  addSchema,
};
