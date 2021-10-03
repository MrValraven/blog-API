const nodemailer = require("nodemailer");

const sendEmail = async (sendTo, subject, message) => {
  const smtptransport = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "informativa@aaue.pt",
      pass: process.env.smtpPassword,
    },
  });

  try {
    await smtptransport.sendMail({
      from: "AAUE <informativa@aaue.pt",
      to: sendTo,
      subject: subject,
      text: message,
      html: `<body><p>${message}</p></body>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendEmail = sendEmail;
