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

export const sendEmail = async (data: { email: string; otp: string }) => {
  const mailOptions: SendMailOptions = {
    from: config.MAIL_USERNAME,
    to: data.email,
    subject: "Verify Account: Nagpur News CMS",
    html: `<p>OTP:<b>${data.otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);

  logger.info("OTP email sent successfully");
};
