const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const articlesController = require('../controllers/articlesController')

// Get All
router.get('/articles', articlesController.list)

// Get One
router.get('/articles/:id', articlesController.show)

module.exports = router
