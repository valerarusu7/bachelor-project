import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { google } from "googleapis";
import mailerInterviewContent from "./mailerInterviewContent";
import mailerRegistrationContent from "./mailerRegistrationContent";

const {
  NODEMAILER_EMAIL,
  NODEMAILER_CLIENT_ID,
  NODEMAILER_CLIENT_SECRET,
  NODEMAILER_REFRESH_TOKEN,
} = process.env;

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    NODEMAILER_CLIENT_ID as string,
    NODEMAILER_CLIENT_SECRET as string,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: NODEMAILER_REFRESH_TOKEN as string,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token.");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: NODEMAILER_EMAIL,
      accessToken,
      clientId: NODEMAILER_CLIENT_ID,
      clientSecret: NODEMAILER_CLIENT_SECRET,
      refreshToken: NODEMAILER_REFRESH_TOKEN,
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
