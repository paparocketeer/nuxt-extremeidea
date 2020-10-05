const { Router } = require('express')

const router = Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Login
router.post('/users/login', usersController.login)

// Get User
router.get('/users/user', usersController.user)

module.exports = router
