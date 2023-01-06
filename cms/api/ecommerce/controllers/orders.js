const { Types } = require('mongoose');
const { createRzpOrder, verifyRzpOrder } = require('../../../helpers/razorpay');
const { sendTemplateEmail } = require('../../../helpers/sendgrid');
const { authShipRocket, createShipRocketOrder } = require('../../../helpers/shiprocket');
const { createPaymentIntent } = require('../../../helpers/stripe');
const handler = require('../../../scripts/handler');
const Document = require('../../cms/model')
const {createOrder, calculateSubTotal, calculateShipping, calculateDiscount, lineItems, updateInventory} = require('../helpers/orders');


//Model
//SendGrid


// console.log(calculateSubTotal("POL20220", "IND"))

// 


exports.verifyDiscount = (req, res) => {

    calculateSubTotal(req.body.cust_id, req.body.channel)
    .then(({weight, currency, line_items, sub_total}) => {
            req.body.line_items = line_items;
            req.body.currency = currency;
            req.body.sub_total = sub_total;
            req.body.weight = weight;
    })

    // update coupon_discount based on the coupon_used by the user
    .then(async () => {
        const discount = await calculateDiscount(req.body);
        if(discount === 0) handler.error(res, 400, {}, "Discount Coupon is Invalid.")
        else handler.success(res, 201, {discount}, "Coupon Applied.", {})
    })
}
 
//Create Order on Stripe
exports.createOrder = (req, res) => {

        // var req.body = {
        //         'cust_id': null,
        //         'channel': null,
        //         'currency': 'inr',
        //         'line_items': [],
        //         'coupon_used': null,
        //         'coupon_discount': null,
        //         'sub_total': null,
        //         'shipping_charges': null,
        //         'tax': null,
        //         'cod': false,
        //         'total': null
        // }

        // update sub_total and line_items based on the prices of line_items and channel
        calculateSubTotal(req.body.cust_id, req.body.channel)
        .then(({weight, currency, line_items, sub_total, customer}) => {
                req.body.line_items = line_items;
                req.body.currency = currency;
                req.body.sub_total = sub_total;
                req.body.weight = weight;
                req.body.customer = customer
        })

        // update coupon_discount based on the coupon_used by the user
        .then(async () => {
                req.body.discount = await calculateDiscount(req.body);
        })

        // update shipping_charges based on the line_items weight, channel and shipping zone
        .then(async () => {
            const shipping = await calculateShipping(req.body)
            if(shipping.err) return handler.error(res, 400, {}, shipping.err)
            else req.body.shipping = shipping.charges
        })

        // update tax based on the sub_total and coupon_discount
        .then(() => {
            req.body.tax = (req.body.sub_total * 5) / 100
        })

        // update the total amount of the order based on above params
        .then(() => {
                // this is temporary as we are not updating total right now in the flow
                req.body.total = req.body.sub_total + req.body.tax + req.body.shipping - req.body.discount;

                
        })
        // create the payment intent on stripe
        .then(async () => {
                const order = await createOrder({
                        payment_id: "none",
                        cust_id: req.body.cust_id,
                        channel: req.body.channel,
                        status: "PENDING",
                        payment_status: req.body.cod === true ? "UNPAID" : "PENDING",
                        payment_method: "COD",
                        coupen_used: req.body.coupon_used,
                        line_items: req.body.line_items,
                        coupon_discount: req.body.discount,
                        sub_total: req.body.sub_total,
                        shipping_charges: req.body.shipping,
                        tax: req.body.tax,
                        total: req.body.total
                }, req.body.customer)
                delete req.body.line_items
                if(req.body.cod === false){
                        
                        const rzp = await createRzpOrder(Math.floor(req.body.total), req.body.currency, order._doc.data)
                        return {...order._doc.data, rzp:rzp}
                }
                // else if(req.body.stripe === true){
                //         const stripe =  await createPaymentIntent(Math.floor(req.body.total), req.body.currency, order._doc.data);
                //         return {...order._doc.data, ...stripe}
                // }
                else{
                        sendTemplateEmail(order._doc.data.customer.email, {...order._doc.data, 
                                currency:req.body.currency, 
                                status_text: "Order Confirmed",
                                description: "We’ll get it to your doorstep as soon as possible! You'll get a shipping notification once your order has left our shop and is on the way to you!"
                        } , 'd-7120efb24ef344368d84cdddad4efdff')
                        return order._doc.data
                }
        })
        .then(result => {
                return handler.success(res, 201,result, "Order created successfuly.", {})
        })
        .catch(err =>{
                console.log(err)
                res.status(400).json({err: err})
        });

}


exports.exchangeOrder = async (req, res) => {

        const id = req.body.order_id;
        const cart_items = req.body.cart_items.filter(item => item.replace === true);
        const revised_items = req.body.cart_items.filter(item => item.replace === false)
        const channel = req.body.channel;

        const line_items = lineItems(cart_items, channel);
        const order = await Document.findOne({"data.id": id, "collection_name": "orders"})

        Document.updateOne({"data.id": id, "collection_name": "orders"}, {$set: {"revised_items": revised_items}})

        const _d = new Date();
        const total = await Document.find({collection_name: 'orders'}).countDocuments();
        data.id = "EXCHANGE" + `${_d.getUTCFullYear()}${_d.getUTCMonth() + 1}` + total

        const new_order = new Document({
                _id: new Types.ObjectId(),
                collection_name: 'orders',
                data: {
                        ...order,
                        line_items,
                        cart_items,
                        created_on: `${_d.getUTCDate()}/${_d.getUTCMonth() + 1}/${_d.getUTCFullYear()}`,
                        status: "PENDING",
                        payment_status: "PAID",
                        coupen_used: '',
                        coupon_discount: 0,
                        sub_total: 0,
                        shipping_charges: 0,
                        tax: 0,
                        total: 0,
                        inventory_update: false,
                        total_items: cart_items.length,
                        payment_id: "none",
                        order_id: "exchange_" + Date.now()
                }
        })

        new_order.save().then(res => {
                handler.success(res, 200, res, "Exchange Order Created.")
        }).catch(err => {
                handler.error(res, 400, err, err.message)
        })

}

exports.updateStock = (req, res) => {

        var returned = false;

        if(req.params.status === 'returns') returned = true;
        else if(req.params.status === 'fulfilled') returned =  false;

        updateInventory(req.params.channel, req.body.cart_items, returned)

        res.send("Ok")

}

exports.sendEmailAdmin = (req, res) => {

        sendTemplateEmail(req.body.to, req.body.order, 'd-7120efb24ef344368d84cdddad4efdff')
        res.send("ok")

}

exports.verifyOrder = async (req,res) => {

        const {rzp_id, pay_id, signature, order_id} = req.body
        const verified = verifyRzpOrder(rzp_id, pay_id, signature)

       if(verified){
               Document.updateOne({"data.id": order_id, "collection_name": "orders"}, {$set: {
                       "data.payment_status": "PAID",
                        "data.payment_method": "Online",
                        "data.payment_id": pay_id
                }}).then(async (res) => {
                        //Order Complete
                        console.log("Order verified through online payment!",res);
                        const order = await Document.findOne({"data.id": order_id, "collection_name": "orders"});
                        //Create Order on ShipRocket & get AWB
                        console.log("Initiating shiprocket placement...");
                        const response = authShipRocket();
                        console.log("authShipRocket...", response);
                        createShipRocketOrder(response,order); 
                })
                
                //Sending Mail from Sendgrid.
                
                const order = await Document.findOne({"data.id": order_id, "collection_name": "orders"})
                sendTemplateEmail(order.data.customer.email, {...order.data, currency: order.data.cart_items[0].currency, status_text: "Order Confirmed"} , 'd-7120efb24ef344368d84cdddad4efdff')
                res.send({
                        status: "SUCCESS",
                        order_id: order_id
                })
       }
       else{
                res.send({
                        status: "FAILED"
                })
       }

}


//Create Order on Database after Success
        //customer_id
        //channel
        //line_items
        //total
        //shipping_charges
        //tax

        //Document: 
            // query: collection_name: customers, data.user_id: customer_id
            // data.email data.phone data.shipping_adresss data.billing_address
        
        //Inventory Updates from Dashboard
        
        //Create Order on ShipRocket & get AWB

        //To Save in the DB
                //Refer to create order function

        //Mail Send User user.email


//Return / Replace / Refund Order