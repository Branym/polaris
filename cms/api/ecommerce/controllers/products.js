const Product = require('../models/product');
const handler = require('../../../scripts/handler');
const ProductType  = require('../models/product_type');
const { Types } = require("mongoose");


//View Products
exports.viewAllProducts = (req, res) => {

    var query = {}

    if(req.query.type) query.product_type = req.query.type
    if(req.query.category) query.category = req.query.category
    if(req.query.name) query.name = {$regex: req.query.name, $options: 'i'}
    if(req.query.sku) query["variants.$.sku"] = {$regex: req.body.sku, $options: 'i'}

    Product.find(query, {name: 1, _id: 1, media: {$slice: 1}, category: 1, product_type: 1, variants: 1}).limit(10).skip(10 * (req.query.page - 1))
    .then(async result => {
        var response = {
            total: await Product.find(query).countDocuments(),
        }
        response["products"] = result;
        return handler.success(res, 200, response, "Found " + response.total + " products"  ,{})}
    )
    .catch(err => handler.error(res, 400, err, err.message))

}

//View Product
exports.viewProduct = (req, res) => {

    Product.findOne({_id: req.query.id})
    .then(async result => {
        return handler.success(res, 200, result, "",{})
    })
    .catch(err => handler.error(res, 400, err, err.message))
}

//Create Product
exports.createProduct = (req, res) => {

    const _product = new Product({
        _id: new Types.ObjectId,
        name: req.body.name,
        slug: req.body.slug,
        media: req.body.media,
        description: req.body.description,
        product_type: req.body.product_type,
        tags: req.body.tags,
        category: req.body.category
    })

    console.log(_product)

    _product.save()
    .then(result => handler.success(res, 201, result, "Product created successfuly.", {}))
    .catch(err => handler.error(res, 400, err, err.code === 11000 ? "Slug must be unique" : err.message))

}

//Edit Product
exports.editProduct = async (req, res) => {

    //check sku
    if(req.body?.variants){

        if(req.body.variants?.filter(v1 => req.body.variants?.filter(v2 => v1.sku === v2.sku).length > 1 ? true : false).length > 1){
            return handler.error(res, 400, {}, "SKUs of variants must be unique")
        }

        var skus = []
        req.body.variants.map(item => {
            skus.push(item.sku)
        });

        var exists = await Product.find({variants: {$elemMatch: {sku: {$in: skus}}}})
        if(exists.length > 1) return handler.error(res, 400, {}, "SKUs of variants must be unique")
        else if (exists.length === 1 && exists[0].variants?.filter(v1 => exists[0].variants?.filter(v2 => v1.sku === v2.sku).length > 1 ? true : false).length > 1) return handler.error(res, 400, {}, "SKUs of variants must be unique")

    }

    Product.updateOne({_id: req.query.id}, {$set: req.body})
    .then(result => handler.success(res, 201, result, "Product updated successfuly.", {}))
    .catch(err => handler.error(res, 400, err, err.code === 11000 ? "Slug must be unique" : err.message))

}

//Delete Product
exports.deleteProduct = (req, res) => {

    Product.deleteOne({_id: req.query.id})
    .then(result => handler.success(res, 201, result, "Product deleted successfuly.", {}))
    .catch(err => handler.error(res, 400, err, err.message))
    
}

//---User
//View or Search Products
exports.viewProducts = (req, res) => {
    
    var query = {
        variants: {
            $elemMatch: {}
        }
    };

    query.variants.$elemMatch[`stock.${req.params.channel}.availability`] = true

    if(req.query.type) query.product_type = req.query.type
    if(req.query.category) query.category = req.query.category
    if(req.query.name) query.name = {$regex: req.query.name, $options: 'i'}
    if(req.query.tags) query.tags = {$in: req.query.tags.split(',')}
    if(req.query.min_price) query.variants.$elemMatch[`stock.${req.params.channel}.price`] = {$gt: Number(req.query.min_price), $lt: Number(req.query.max_price)}

    Product.find(query, {name: 1, _id: 1,slug: 1, media: 1, category: 1,tags:1, product_type: 1, variants: {$slice: 1}}).limit(50).skip(50 * (req.query.page - 1))
    .then(async result => {
        var response = {
            total: await Product.find(query).countDocuments(),
        }
        response["products"] = result;
        return handler.success(res, 200, response, "Found " + response.total + " products"  ,{})}
    )
    .catch(err => handler.error(res, 400, err, err.message))

}


//View One Product **
exports.viewProductPage = async (req, res) => {

    //Get the product
    const product = await Product.findOne({slug: req.params.slug});
    if(!product) return handler.error(res, 404, {}, "Product Not Found.")

    const variants = product._doc.variants.filter(variant => variant.stock[req.params.channel].availability === true)

    //From Type Get the product type details
    const type = await ProductType.findOne({name: product.product_type});
    if(type.sub_product === true) return handler.error(res, 404, {}, "Product Not Found.")

    const sub_types = await ProductType.find({name: {$in: type.sub_products}},{name: 1, attributes: 1, shippable: 1});

    //For each type find their products
    const sub_products = await Product.find({product_type: {$in: type.sub_products}});

    //Get Related Products
    const related = await Product.find({tags: {$in: product.tags}}, {name: 1, slug: 1, variants: {$slice: 1} , media: {$slice: 1}, category: 1, tags: 1}).limit(6)

    // //Now collab all the data
    handler.success(res, 200, {
        ...product._doc,
        variants,
        attributes: type.attributes,
        shippable: type.shippable,
        addons: sub_products,
        addons_properties: sub_types,
        related
    }, "Found.",{})


    

}