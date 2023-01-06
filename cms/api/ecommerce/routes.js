const express = require('express')
const Router = express.Router()
const {isAuthorized, isAuthenticated} = require('../../authentication/middlewares')
const { createType, getTypes } = require('./controllers/product_types');
const {createProduct, viewProduct, viewAllProducts, editProduct, deleteProduct, viewProducts, viewProductPage} = require('./controllers/products')
const {createOrder, verifyDiscount, updateStock, sendEmailAdmin, verifyOrder} = require('./controllers/orders')
const {uploadToS3} = require('../../helpers/uploadMedia');

//Create Product Type
Router.post('/type/create', isAuthorized("admin"), createType)

//View All Product Types
Router.get('/type/viewall', isAuthorized("admin"), getTypes)

//Products
Router.post('/create', isAuthorized("admin"), createProduct);

Router.post('/upload', uploadToS3);
Router.get('/view', isAuthorized("admin"), viewProduct);
Router.get('/view_all', isAuthorized("admin"), viewAllProducts);
Router.post('/edit', isAuthorized("admin"), editProduct);
Router.delete('/delete', isAuthorized("admin"), deleteProduct);
Router.post('/create_order', createOrder);
Router.post('/verify_discount', verifyDiscount);
Router.post('/verify_rzp', verifyOrder);
Router.post('/:channel/update_stock/:status',isAuthorized("admin"), updateStock);
Router.post('/send_mail', isAuthorized("admin"), sendEmailAdmin);

Router.get('/:channel/', viewProducts);
Router.get('/:channel/:slug', viewProductPage);


module.exports = Router