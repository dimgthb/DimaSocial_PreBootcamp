const router = require('express').Router()

// import controllers
const { profile_controller } = require('../controllers')

// define route
router.get('/profile/:uid', profile_controller.getProfilebyuid)
router.patch('/profile/:uid', profile_controller.patchProfile)

// export * module
module.exports = router