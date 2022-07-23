const { Contact, contactUpdateFavoriteSchema} = require('../../models/contact');
const { createError } = require('../../helpers');

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true}); //в фигурных скобках обновляем версию обьекта
    if (!result) {
      throw createError(400, "missing field favorite");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
