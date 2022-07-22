// const contacts = require('../../models/contact');
// const { createError } = require('../../helpers');
// const { addSchema } = require('../../schemas/contacts');

// const updateById = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw createError(400);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = updateById;
