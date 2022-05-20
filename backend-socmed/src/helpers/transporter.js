const nodemaier = require('nodemailer')

module.exports.transporter = nodemaier.createTransport({
    service : 'gmail',
    auth : {
        user : 'bowotp@gmail.com',
        pass : process.env.APP_PASS
    },
    tls : {
        rejectUnauthorized : false
    }
})