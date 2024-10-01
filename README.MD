About:
microservice for sending email

SENDER_EMAIL=""
SENDER_EMAIL_PASS=""
SMTP_HOST=""
SMTP_PORT=

npm install express nodemailer dotenv body-parser nodemailer
to run:
nodemon index.js

for use api:
{
"to": "recipient@example.com",
"subject": "Order Confirmation",
"text": "Thank you for your order!"
}
