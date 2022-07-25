const { Schema, model } = require("mongoose");
const Joi = require('joi');

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        // token: {
        //     type: String,
        //     default: null,
        // },
    },
    { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema
};