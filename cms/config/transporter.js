const nodemailer = require('nodemailer')
// const {transporter} = require('../settings/smtp.json')
// exporting the transporter 
module.exports = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
 })
