const nodemailer = require('nodemailer');

const sendEmail = async (sendTo, subject, message) => {

    const smtptransport = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'informativa@aaue.pt',
            pass: process.env.smtpPassword,
        }
    });
    
    await smtptransport.sendMail({
        from: 'AAUE <informativa@aaue.pt',
        to: sendTo,
        subject: subject,
        text: message,
        html: `<body><p>${message}</p></body>`
    });
}

module.exports.sendEmail = sendEmail;