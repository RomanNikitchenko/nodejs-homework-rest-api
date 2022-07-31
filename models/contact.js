const { Schema, model } = require('mongoose');
const Joi = require('joi');

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true, // не дает возможность создать 2 одинаковых номера в базе данных
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', ContactSchema);


// Joi проверка
//проверяет на наличие обязательных свойств (name, email, phone)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

//проверка для patch
const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  addSchema,
  contactUpdateFavoriteSchema,
};
