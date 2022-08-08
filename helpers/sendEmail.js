const sgMail = require('@sendgrid/mail'); 
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env; // ключ получаем при регистрации в SendGrid
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {

    const email = { ...data, from: "nikitchenkoroman25@gmail.com" }; // from: "nikitchenkoroman25@gmail.com", // от кого письмо

    try {
        await sgMail.send(email); // сервис SendGrid для рассылки и отправки писем
        console.log("Email send success");
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;
  