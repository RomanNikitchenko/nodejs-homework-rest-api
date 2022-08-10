const { User, emailSchema } = require("../../models/user");
const { createError, sendEmail } = require('../../helpers');

//для повторной отправки письма-верификация
const resendVerifyEmail = async (req, res, next) => {
  try {
    // проверка Joi валидности введенных данных для регистрации нового пользователя
    const { error } = emailSchema.validate(req.body);

    if (error) {
      throw createError(400, 'Bad Request');
      // throw createError(400, error.message); //error.message выдает подсказку каких полей не хватает
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404);
    }

    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }

    const mail = {
      to: email, // кому письмо
      subject: "Подтверждение email", // заголовок письма
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Подтвердить email</a>` // содержимое письма // клик по ссылки это get запрос
    };
    await sendEmail(mail);// функция для отправки писем через сервис SendGrid

    res.status(200).json({
      message: "Verification email sent"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
