const express = require('express')
const {upload_controller} = require('../controllers')
const route = express.Router()

route.post('/.upload', upload_controller.uploadFiles)

module.exports = route