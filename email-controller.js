const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { logger, setLogLevel } = require("./logger/logger");
setLogLevel("DEBUG");

logger.debug(`Loading SMTP settings...`);
logger.debug(`SMTP_HOST: ${process.env.SMTP_HOST}`);
logger.debug(`SMTP_PORT: ${process.env.SMTP_PORT}`);
logger.debug(`SENDER_EMAIL: ${process.env.SENDER_EMAIL}`);
logger.debug(`SENDER_EMAIL_PASS: ${process.env.SENDER_EMAIL_PASS}`);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS,
    },
});

logger.debug(`SMTP transporter initialized`);

const sendEmail = async (to, subject, text) => {
    logger.debug(`Starting email sending process...`);
    logger.debug(`From: "${process.env.SENDER_EMAIL}"`);
    logger.debug(`To: ${to}`);
    logger.debug(`Subject: ${subject}`);
    logger.debug(`Text: ${text.length > 50 ? "..." : text}`);
    try {
        const info = await transporter.sendMail({
            from: '"SomeName" <SENDER_EMAIL>',
            to,
            subject,
            text,
        });
        console.log("Message sent: %s", info.messageId);
        logger.debug(`Message sent: %s`, info.messageId);
        logger.debug(`Response status: ${info.response}`);
        logger.debug(`Response code: ${info.code}`);
        logger.debug(`Response message: ${info.message}`);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        logger.error("Error sending email:", error);
        logger.error("Error stack trace:", error.stack);
        throw error;
    }
};

module.exports = { sendEmail };
