const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// транспортер
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // возможно сдпелать env, подумать
    port: 587, // Порт для SMTP (может быть 465 или gmail -587)
    secure: false, // true для порта 465, false для других
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: '"SomeName" <SENDER_EMAIL>',
            to,
            subject,
            text,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = { sendEmail };
