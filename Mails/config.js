const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.get("emailUsername"),//'hakhamanish.kourosh@gmail.com'
        pass: config.get("emailPassword")//'zerohour'
    }
});

module.exports = { transporter };