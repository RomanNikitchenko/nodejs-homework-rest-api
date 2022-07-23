const { Contact, addSchema } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true}); //в фигурных скобках обновляем версию обьекта
    if (!result) {
      throw createError(400);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
