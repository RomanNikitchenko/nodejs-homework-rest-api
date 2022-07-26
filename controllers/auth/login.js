const { User, joiLoginSchema } = require('../../models/user');
const { createError } = require('../../helpers');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw createError(400, 'Bad Request');
    }

    const { password, email } = req.body; //пользователь ввел пароль и логин
    const user = await User.findOne({ email }); // находим в базе данных пользователя по email
    const passCompare = bcrypt.compareSync(password, user.password); // сравниваем введенный пароль с паролем пользователя которого нашли по email
    if (!user || !passCompare) {
      throw Unauthorized({
        ResponseBody: {
          message: 'Email or password is wrong',
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = login;
