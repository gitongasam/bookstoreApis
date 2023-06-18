const express = require('express')
const userRoutes = express.Router()
const { postUser, loginUser } = require('../controllers/userControllers.js')

userRoutes.post('/users',  postUser)
userRoutes.post('/users/login', loginUser)

module.exports = userRoutes;