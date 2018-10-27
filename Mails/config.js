const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'hakhamanish.kourosh@gmail.com',
        pass: 'zerohour'
    }
});

module.exports = { transporter };