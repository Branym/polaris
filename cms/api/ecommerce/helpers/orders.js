const Document = require('../../cms/model');
const handler = require('../../../scripts/handler');
const { Types } = require("mongoose");
const Product = require('../models/product');

exports.createOrder = async (data, customer) => {

    data.customer = {
        name: customer.first_name + " " + customer.last_name,
        email: customer.email,
        phone: customer.phone,
        country_code: customer.country_code
    }

    data.billing_address = {
        address_line_1: customer.address_line_1,
        address_line_2: customer.address_line_2,
        country: customer.country,
        state: customer.state,
        city: customer.city,
        pincode: customer.pincode
    }

    data.shipping_address = customer.shipping

    data.cart_items = customer.cart_items

    data.total_items = customer.cart_items.length

    const total = await Document.find({collection_name: 'orders'}).countDocuments();
    const _d = new Date();
    data.id = "ORDER" + `${_d.getUTCFullYear()}${_d.getUTCMonth() + 1}` + total
    data.created_on = `${_d.getUTCDate()}/${_d.getUTCMonth() + 1}/${_d.getUTCFullYear()}`
    data.user = customer.user;

    const document = new Document({
        _id: new Types.ObjectId,
        data: data,
        collection_name: 'orders',
    })

    return document
    .save()

}   

exports.calculateSubTotal = async (cust_id, channel) => {

    const cust = await Document.findOne({collection_name: 'customers', "data.cust_id": cust_id})
    const _channel = await Document.findOne({collection_name: 'channels', "data.slug": channel})
    var line_items = cust.data.cart_items.map(item => {
        return {
            sku: item.sku,
            quantity: item.quantity,
            sub_products: item.sub_products,
            information: item.information,
        }
    });

    var query = []
    var currency = _channel.data.currency;

    line_items.map((item, index) => {
        line_items[index].item_id = index + 1;
        line_items[index].sub_product = 0;
        if(item?.sub_products?.length > 0){
            item?.sub_products.map(product => {
                line_items.push({...product, sub_product: index + 1, quantity: item.quantity})
            })
            delete line_items[index].sub_products;
        }
    })

    line_items.map((item) => {
        query.push(item.sku)
    })
    for (let index = 0; index < line_items.length; index++) {
        const item = line_items[index];
        var product = await Product.findOne({variants: {$elemMatch: {sku: item.sku}}}, {name: 1, variants: {$elemMatch: {sku: item.sku}}})
        line_items[index].name = product.name 
        line_items[index].image = product.variants[0].media[0]
        line_items[index].weight = product.variants[0].weight
        line_items[index].price = product.variants[0].stock[channel].price
        line_items[index].variant_name = product.variants[0].name
        
    }

    var sub_total = 0
    var weight = 0
    line_items.map((item) => {
        sub_total += item.price * item.quantity;
        weight += item.weight * item.quantity;
    });

    console.log(weight, sub_total)

    return {currency ,weight, line_items, sub_total, customer: cust.data}

}

exports.lineItems = async (line_items, channel) => {

    var query = []

    line_items.map((item, index) => {
        line_items[index].item_id = index + 1;
        line_items[index].sub_product = 0;
        if(item?.sub_products?.length > 0){
            item?.sub_products.map(product => {
                line_items.push({...product, sub_product: index + 1})
            })
            delete line_items[index].sub_products;
        }
    })

    line_items.map((item) => {
        query.push(item.sku)
    })
    var products = await Product.find({variants: {$elemMatch: {sku: {$in: query}}}}, {name: 1, variants: 1})
    line_items.map((item, index) => {
        var product = products.filter(product => product.variants.filter(variant => variant.sku === item.sku).length > 0)[0]
        line_items[index].name = product.name 
        line_items[index].image = product.variants[0].media[0]
        line_items[index].weight = product.variants[0].weight
        line_items[index].price = product.variants[0].stock[channel].price
        line_items[index].variant_name = product.variants[0].name
    })

    return line_items
}

exports.calculateShipping = async (body) => {

    var charges = 0;
    const {weight, shipping_zone, channel} = body

    const zone = await Document.findOne({collection_name: 'shipping', "data.slug": shipping_zone})
    
    if(zone){
        charges = zone.data.rate[channel] * weight
        return {charges, err: false}
    }
    else{
        return {err: "Zone does not exist."}
    }

}

exports.calculateDiscount = async (body) => {

    var discount = 0
    const {coupon_used, line_items, sub_total, cust_id, channel} = body
    const coupon = await Document.findOne({collection_name: 'discounts', "data.code": coupon_used})

    if(coupon){
    
        //Check Start Date and End Date
        const s_date = new Date(coupon.data.start_date);
        const e_date = new Date(coupon.data.end_date);
        const _date = new Date()

        if(_date - s_date < 0 || e_date - _date <0) return 0
        
        //Check if minimum number of items
        if(coupon.data.requirement === "Minimum Items" && line_items.filter(item => item.item_id > 0).length < Number(coupon.data.minimum_items)) return 0

        //Check Minimum Value
       
        if(coupon.data.requirement === "Minimum Value" && sub_total < coupon.data.minimum_value[channel]) return 0

        //Check if total limit is over

        //Check if user has already used

        //Caclulate Discount
        if(coupon.data.type === "Fixed") return sub_total - coupon.data.price[channel]
        else return (sub_total * coupon.data.price[channel])/100

    }
    else{
        return 0
    }

}

const dummy_data = [
    {
        sku: "03White",
        quantity: 2
    },
]

//Update Inventory
 exports.updateInventory = async (channel, cart_items, returned = false) => {

    cart_items.map(async item => {
        var product = await Product.findOne({variants: {
            $elemMatch: {
                sku: item.sku
            }
        }})

        product.variants.map((variant, index) => {
            if(variant.sku == item.sku){
                // console.log("Current : " + product.variants[index].stock[channel].inventory)
                if(item.replace !== true){
                    product.variants[index].stock[channel].inventory +=  (returned ? +1 : -1) * item.quantity
                }
                // console.log("After : " + product.variants[index].stock[channel].inventory)

            }
        })

        Product.updateOne({_id: product._id}, {$set: product}).then(res => {
            console.log(res)
        })
    })
    
    
}

