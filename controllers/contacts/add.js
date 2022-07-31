const { Contact, addSchema } = require('../../models/contact');
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { _id } = req.user;
    const result = await Contact.create({...req.body, owner: _id});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
