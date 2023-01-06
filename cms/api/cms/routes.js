const express = require('express')
const Router = express.Router()
const {isAuthenticatedCMS} = require('../../authentication/middlewares')
const { attachOperation, checkUnique, validateData, validateQuery, checkRole, addVariablesToData, addTotal } = require('./middlewares')
const { operations } = require('./controller')
const { addDateConstants } = require('../../middlewares/date')

//Create Article
Router.post('/:collection_name/:operation_name', 
                attachOperation, 
                isAuthenticatedCMS, 
                checkRole, 
                validateData, 
                validateQuery, 
                addDateConstants, 
                addTotal,
                addVariablesToData,
                checkUnique,
                operations)

module.exports = Router