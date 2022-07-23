const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
      const result = await Contact.findById(contactId); // поиск по id
    //   const result = await Contact.findOne({_id: contactId}); // поиск по критериям
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
