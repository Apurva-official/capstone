const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router();

router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.post('/addEvent', authController.addEvent)

module.exports = router;