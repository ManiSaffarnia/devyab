const nodemailer = require('nodemailer');

module.exports = async (email, url) => {

    console.log(email);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'hakhamanish.kourosh@gmail.com',
            pass: 'zerohour'
        }
    });

    const mailOptions = {
        from: '"Devyab" <hakhamanish.kourosh@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: 'Email Verification', // Subject line
        //text: 'Hello world?', // plain text body
        html: `<p>Welcome to our community. Please click this <a href=${url}>Verification Link</a><p>` // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });

};

