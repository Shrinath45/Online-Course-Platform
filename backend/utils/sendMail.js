import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"SkillForge" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });
};
