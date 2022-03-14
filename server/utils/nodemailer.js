const nodemailer = require('nodemailer')

const sendMessage = async (data) => {
    const transporter = nodemailer.createTransport({
        post: 465,
        host: 'smtp.gmail.com', 
        auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
            },
        secure: true,
    });

    const info = await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: data.email,
        subject: 'Order Confirmation',
        html: `<h3>Hello ${data.name} </h3> <br>
        <p>
        Thanks for shopping with us, your product with transfer ref ${data.ref} has been placed successfully
         and is being processed. You will recieve a follow up email about details concerning 
         the delivery of your goods.
        </p>

        <p>Thank you for choosing us</p>
        `,
    })

    return info

}


module.exports = sendMessage