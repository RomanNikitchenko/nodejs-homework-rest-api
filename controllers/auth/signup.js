const { User, joiRegisterSchema } = require('../../models/user');
const { createError } = require('../../helpers');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw createError(400, 'Bad Request');
    }

    const { password, email, subscription } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw Conflict({
        ResponseBody: {
          message: 'Email in use',
        },
      });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //Для засолки пароля

    const result = await User.create({
      password: hashPassword,
      email,
      subscription,
    });
    res.status(201).json({
      ResponseBody: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
