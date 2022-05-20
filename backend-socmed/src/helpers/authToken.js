const jwt = require('jsonwebtoken')

module.export = {
    auth: (req, res, next) => {
        jwt.verify(req.token, "private12", (err, decode)=>{
            if (err) {
                return res.status(401).send("user not auth!")
            }
            req.user = decode

            next()
        })
    }
}