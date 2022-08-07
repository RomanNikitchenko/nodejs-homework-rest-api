const { User, joiRegisterSchema } = require('../../models/user');
const { createError, sendEmail } = require('../../helpers');
const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar'); // пакетик для генерации аватарак 
const { nanoid } = require('nanoid'); //=> "V1StGXR8_Z5jdHi6B-myT" //для генерации строки с произвольными символами 

const signup = async (req, res, next) => {
  try {

    // проверка Joi валидности введенных данных для регистрации нового пользователя
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw createError(400, 'Bad Request');
      // throw createError(400, error.message); //выдает подсказку каких полей не хватает
    }

    //введенные данные для регистрации нового пользователя
    const { password, email, subscription } = req.body;

    // если пользователь есть опрокидываем ошибку в catch
    const user = await User.findOne({ email });
    if (user) {
      throw Conflict({
        ResponseBody: {
          message: 'Email in use',
        },
      });
    }

    //Для засолки пароля
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    //В пакет gravatar передаем email пользователя, по email генерируем аватарку для пользователя
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    //создаем нового пользователя в базе данных
    const result = await User.create({
      password: hashPassword,
      email,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email, // кому письмо
      subject: "Подтверждение email", // заголовок письма
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>` // содержимое письма
    };
    await sendEmail(mail);
    
    // пользователь успешно создан в базу данных статус 201 тело запроса обьект ResponseBody
    res.status(201).json({
      ResponseBody: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = signup;
