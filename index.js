const express = require("express");
const { sendEmail } = require("./email-controller");

//const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
//app.use(bodyParser.json());
//dotenv.config();

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        await sendEmail(to, subject, text);
        res.status(200).send("Email sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending email.");
    }
});

app.get("/health", (req, res) => {
    res.send({ status: "Email service is up and running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Email service running on port ${PORT}`);
});
