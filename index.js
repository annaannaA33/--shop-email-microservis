const express = require("express");
const { sendEmail } = require("./email-controller");
const { logger, setLogLevel } = require("./logger/logger");
const dotenv = require("dotenv");
const cors = require("cors");

setLogLevel("DEBUG");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/sendemail", async (req, res) => {
    logger.info(
        `Received POST request to /sendemail with query parameters: ${JSON.stringify(
            req.body
        )}`
    );
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    const { to, subject, text } = req.body;
    logger.debug(
        `Extracted email details: to=${to}, subject=${subject}, text=${
            text.length > 50 ? "..." : text
        }`
    );
    try {
        const result = await sendEmail(to, subject, text);
        logger.debug(`Attempting to send email to: ${to}, Subject: ${subject}`);

        if (result) {
            logger.info("Email sent successfully!");
            res.status(200).send("Email sent successfully!");
        } else {
            logger.error("Failed to send email");
            res.status(500).send("Error sending email.");
        }
    } catch (error) {
        logger.error(`Error occurred while sending email: ${error.message}`);
        logger.error(`Error stack trace:`, error.stack);

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
