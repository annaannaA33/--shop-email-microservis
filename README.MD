e-shop-email-microservice

About:

This is a microservice for sending emails.

To run the service, use the command:
nodemon index.js

Currently, the microservice is hosted on Render. You can access it at: https://e-shop-email-microservice.onrender.com.

To deploy it separately, please fill in the environment variables file. Create a .env file and populate it with the following parameters:

SENDER_EMAIL=""
SENDER_EMAIL_PASS=""
SMTP_HOST=""
SMTP_PORT=""

Imports used:
npm install express nodemailer dotenv body-parser nodemon

For API usage: To send an email, use the following JSON format in your request:
{
"to": "recipient@example.com",
"subject": "Order Confirmation",
"text": "Thank you for your order!"
}
