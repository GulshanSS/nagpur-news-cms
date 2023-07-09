import nodemailer, { SendMailOptions } from "nodemailer";
import config from "../config";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  host: config.MAIl_HOST,
  port: config.MAIL_PORT,
  secure: true,
  auth: {
    user: config.MAIL_USERNAME,
    pass: config.MAIL_PASSWORD,
  },
});

export const OTPTemplate = (otp: string) => ({
  subject: "Verify Account: Nagpur News CMS",
  html: `<p>OTP:<b>${otp}</b></p>`,
});

export const AccountCreationTemplate = (email: string, password: string) => ({
  subject: "Welcome: Nagpur News CMS",
  html: `<p>Please find below assigned credentials</p><br>
    <p>Email: <b>${email}</b></p><br>
    <p>Password: <b>${password}</b></p><br>`,
});

export const sendEmail = async (
  email: string,
  data: string,
  emailType: string
) => {
  let template = {};
  if (emailType === config.EMAIL_TYPE_OTP) {
    template = OTPTemplate(data);
  } else if (emailType == config.EMAIL_TYPE_ACCOUNT_CREATION) {
    template = AccountCreationTemplate(email, data);
  }

  const mailOptions: SendMailOptions = {
    from: config.MAIL_USERNAME,
    to: email,
    ...template,
  };

  await transporter.sendMail(mailOptions);

  logger.info("OTP email sent successfully");
};
