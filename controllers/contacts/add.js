const { Contact, addSchema } = require('../../models/contact');
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = addSchema.validate({ ...req.body, owner: _id });
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
