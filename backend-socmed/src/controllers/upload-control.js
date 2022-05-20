// const db = require('.../database')
const db = require('../config').promise()
const {uploader} = require('../helpers/uploader')
const fs = require('fs')

module.exports = ({
    uploadFiles: (req, res) => {
        try {
            let path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name : 'file' }])

            upload(req,res,(error)=> {
                if(error){
                    console.log(error);
                    res.status(500).send(error)
                }

                const {file} = req.files
                const filepath = file ? path + '/' + file[0].filename : null

                let data = JSON.parse(req.body.data)

                let sqlInsert = 'Insert into userp set ?'
                db.query(sqlInsert, data, (err, results)=> {
                    if (err) {
                        console.log(err);
                        fs.unlinkSync('./public' + filepath)
                        res.status(500).send(err)
                    }
                    res.status(200).send({ message : "Upload File Succes"})
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }
})