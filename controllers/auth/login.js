const { User, joiLoginSchema } = require('../../models/user');
const { createError } = require('../../helpers');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw createError(400, 'Bad Request');
      // throw createError(400, error.message); //выдает подсказку чего не хватает
    }

    const { password, email } = req.body; //пользователь ввел пароль, логин, подписка
    const user = await User.findOne({ email }); // находим в базе данных пользователя по email
    const passCompare = bcrypt.compareSync(password, user.password); // сравниваем введенный пароль с паролем пользователя которого нашли по email
    if (!user || !passCompare) {
      throw Unauthorized({
        ResponseBody: {
          message: 'Email or password is wrong',
        },
      });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      ResponseBody: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
