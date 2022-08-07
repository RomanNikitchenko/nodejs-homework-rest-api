const sgMail = require('@sendgrid/mail'); 
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env; // ключ получаем при регистрации в SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {

    // email это обьект с полями 
    //     to: "nikitchenkoroman25@gmail.com", // кому письмо
    //     from: "nikitchenkoroman25@gmail.com", // от кого письмо
    //     subject: "Новая заявка с сайта", // заголовок письма
    //     html: "<p>С сайта пришла новая заявка</p>" // содержимое письма

    const email = { ...data, from: "nikitchenkoroman25@gmail.com" };

    try {
        await sgMail.send(email);
        console.log("Email send success");
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;
  