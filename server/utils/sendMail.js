const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            },
        })

        const source = fs.readFileSync(path.join(__dirname, template), 'utf8')
        const compiledTemplate = handlebars.compile(source)

        transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        })

    } catch (error) {
        res.status(400)
        throw new Error('Error sending message')
    }
}

module.exports = sendEmail
