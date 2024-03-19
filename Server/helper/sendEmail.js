const nodemailer = require('nodemailer');
async function sendEmail(email, subject, text) {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.YOUR_USERNAME_MAILTRAP,
            pass: process.env.YOUR_PASS_MAILTRAP,
        },
      });

    let mailOptions = {
        from: "BenCommerce", 
        to: email,
        subject: subject,
        text: text
    };

    return await transporter.sendMail(mailOptions);
}

module.exports = sendEmail