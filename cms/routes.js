const express = require('express')
const Router = express.Router()

const authRoutes = require("./authentication/routes")
const cmsRoutes = require('./api/cms/routes')
const productRoutes = require('./api/ecommerce/routes')

const {addDateConstants} = require('./middlewares/date')


Router.use('/auth', authRoutes);
Router.use('/collections', addDateConstants, cmsRoutes);
Router.use('/products', productRoutes);



module.exports = Router