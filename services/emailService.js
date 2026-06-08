const mailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
// Create a transporter using SMTP
const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendEmail = async (template, data, to, subject) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "views",
    "emails",
    `${template}.ejs`,
  );
  const html = await ejs.renderFile(templatePath, data);
  const message = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  };
  await transporter.sendMail(message);
};
module.exports = { sendEmail };
  