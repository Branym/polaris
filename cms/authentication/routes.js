const express = require('express')
const Router = express.Router()
const controllers = require("./controllers")
const {isAuthenticated} = require('./middlewares')

Router.post('/signup', controllers.signUp)

Router.post('/signin', controllers.signIn)

Router.patch('/update/email', isAuthenticated, controllers.updateEmail)

Router.post('/password/forgot', controllers.sendCode)

Router.post('/password/reset', controllers.resetPassword)

Router.patch('/update/role', isAuthenticated, controllers.updateRole)

Router.patch('/update/password', isAuthenticated, controllers.updatePassword)

Router.delete('/delete', isAuthenticated, controllers.deleteAccount)

module.exports = Router