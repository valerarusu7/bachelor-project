import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import mailerInterviewContent from "./mailerInterviewContent";
import mailerRegistrationContent from "./mailerRegistrationContent";

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASSWORD,
    },
  } as SMTPTransport.Options);

  return transporter;
};

function verifyTransporter(
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
) {
  transporter.verify((error) => {
    if (error) {
      return console.log(error);
    }
  });
}

export async function sendInterviewEmail(
  companyName: string,
  positionName: string,
  recipientEmail: string,
  interviewUrl: string
) {
  let transporter = await createTransporter();
  verifyTransporter(transporter);

  const messageOptions = {
    from: `${companyName} Interview <${NODEMAILER_EMAIL}>`,
    to: recipientEmail,
    subject: `${companyName} interview invitation`,
    html: mailerInterviewContent(companyName, positionName, interviewUrl),
  };

  await transporter.sendMail(messageOptions);
}

export async function sendRegistrationEmail(
  companyName: string,
  senderName: string,
  recipientEmail: string,
  registerUrl: string
) {
  let transporter = await createTransporter();
  verifyTransporter(transporter);

  const messageOptions = {
    from: `${companyName} Interview <${NODEMAILER_EMAIL}>`,
    to: recipientEmail,
    subject: `${companyName} register invitation`,
    html: mailerRegistrationContent(companyName, senderName, registerUrl),
  };

  await transporter.sendMail(messageOptions);
}
