const multer = require('multer')
const fs = require('fs')

module.export={
    uploader:(directory, fileNamePrefix)=>{
        //lokasi penyimpanan file
        const defaultDir= '../public'

        //diskStorage : menyimpang file dari FE Ke BE
        const storage = multer.diskStorage({
            destination:(req,file,cb)=> {
                const pathDir = defaultDir + directory

                if (fs.existsSync(pathDir)) {
                    console.log('Directory ada');
                } else {
                    fs.mkdir(pathDir, { recursive:true }, err=> cb(err, pathDir))
                }
            },
            filename:(req,file,cb)=>{
                const ext = file.originalname.split('.')
                const filename = fileNamePrefix + Date.now + '.' + ext[ext.length-1]
                cb(null, filename)
            }
        })

        const fileFilter = (req, file, cb) => {
            const ext = /\.(jpg|jpeg|png|gif|pdf|txt|JPG|PNG|JPEG)/
            if(!file.originalname.match(ext)) {
                return cb(new Error('Cant upload your file type'), false)
            }
            cb(null, true)
        }
        return multer({
            storage,
            fileFilter
        }) 
    }
}