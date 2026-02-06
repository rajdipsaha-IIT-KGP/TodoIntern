const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/authControllers')
const router = express.Router()
router.post("/register",registerUser)
router.post('/login',loginUser)
router.get('/logoutUser',logoutUser)
module.exports = router