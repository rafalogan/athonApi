const nodemailer = require('nodemailer');

const { mailer } = require('../.env');

const transporter = nodemailer.createTransport({
    service: mailer.service,
    auth: {
        user: mailer.mail,
        pass: mailer.pass
    }
});

module.exports = transporter;