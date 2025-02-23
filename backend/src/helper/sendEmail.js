const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  try {

    console.log(process.env.SMTP_HOST)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: options.email,
      subject: options.subject,
      text: options?.message || "",
      html: options.html,
      attachments: options?.attachments || [],
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  sendMail,
};