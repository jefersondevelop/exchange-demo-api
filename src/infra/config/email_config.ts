import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'nodemailer-express-handlebars'

dotenv.config();

let smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
        expires: 1484314697598
    },
    tls: {
        rejectUnauthorized: false
    }
});

smtpTrans.use('compile', handlebars({
    viewEngine: {
        partialsDir: '../api/src/infra/templates/',
        layoutsDir: '../api/src/infra/templates/',
        defaultLayout: "recoverpass"
    },
    viewPath: '../api/src/infra/templates/'
}))

export default smtpTrans;