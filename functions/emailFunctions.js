const nodemailer = require("nodemailer");

const sendEmail = async (sendTo, subject, message) => {
  const smtptransport = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "informatica@aaue.pt",
      pass: process.env.smtpPassword,
    },
  });

  try {
    await smtptransport.sendMail({
      from: "AAUE <informatica@aaue.pt",
      to: sendTo,
      subject: subject,
      html: `<body>
        <h1>Enviado pelo formulário de contacto em ${message.origem}</h1>
        <p>Nome: ${message.name}</p>
        <p>Email: ${message.email}</p>
        <p>Mensagem: ${message.text}</p>
      </body>`,
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendEmail = sendEmail;
