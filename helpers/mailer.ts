import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { google } from "googleapis";

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

export default async function sendEmail(
  companyName: string,
  positionName: string,
  recipient: string,
  url: string
) {
  let transporter = await createTransporter();
  verifyTransporter(transporter);

  const messageOptions = {
    from: `${companyName} Interview <${NODEMAILER_EMAIL}>`,
    to: recipient,
    subject: `${companyName} interview invitation`,
    html: `
        <h3> TEST </h3>
        <p> Interview for ${positionName}:</p>
        <p> ${url} </p>
        `,
  };

  await transporter.sendMail(messageOptions);
}
