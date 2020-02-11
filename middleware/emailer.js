"use strict";
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})
const sendEmail = (req, res, next) => {
    jwt.sign(
        req.body.email,
        process.env.JWT_KEY,
        {
            expiresIn: '7d',
        },
        (err, emailToken) => {
            const url = `http://localhost:8000/register/${emailToken}`;

            transporter.sendMail({
                to: req.body.email,
                subject: 'Welcome to The Farrier Center',
                html: `Create Your Account: <a href="${url}">${url}</a>`,
            })
        },
    )

}

module.exports = { sendEmail }


