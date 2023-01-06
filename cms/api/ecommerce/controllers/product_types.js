const validate = require("../../../scripts/validator")
const handler = require('../../../scripts/handler');
const ProductType  = require('../models/product_type');
const { Types } = require("mongoose");



exports.createType = async (req, res) => {

    const pType = new ProductType({
        _id: new Types.ObjectId,
        name: req.body.name,
        weight: req.body?.weight,
        shippable: req.body.shippable,
        sub_product: req.body?.sub_product,
        sub_products: req.body?.sub_products,
        attributes: req.body?.attributes
    })

    pType.save()
    .then(result => handler.success(res, 201, result, "Product Type created successfuly.", {}))
    .catch(err => handler.error(res, 400, err, err.code === 11000 ? "Type name must be unique" : err.message))

}


exports.getTypes = async (req, res) => {

    ProductType.find({}, {name: 1, sub_product: 1, sub_products: 1, shippable: 1,weight: 1, attributes: 1})
    .then(result => handler.success(res, 201, result, "Found " + result.length + " results.", {}))
    .catch(err => handler.error(res, 400, err, err.message))
}