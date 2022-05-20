const router = require('express').Router()

// import controllers
const { user_controller } = require('../controllers')
const { auth } = require('../helpers/authToken')

// define route
router.post('/users/regis', user_controller.register)
router.get('/users', user_controller.getUsers)
router.get('/users/:uid', user_controller.getUserById)
router.get('/auth/verify/:token', user_controller.verifyAccount)
router.post('/auth/refresh', user_controller.refreshToken)
router.post('/auth/login', user_controller.login)
router.get('/auth/keeplogin', user_controller.keepLogin)
router.post('/auth/resetcheck', user_controller.checkEmailReset)
router.get('/auth/resetok/:token', user_controller.resetPassOk)

// export * module
module.exports = router