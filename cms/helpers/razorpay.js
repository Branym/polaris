const Razorpay = require('razorpay')

exports.createRzpOrder = async (amount, currency, order) => {

    var instance = new Razorpay({ key_id: 'rzp_live_7NDqF1KbFfZTnB', key_secret: 'ckRjyLmZByCBiHSed4z5oXSB' })

    const new_order = await instance.orders.create({
        // amount: Math.round(amount) * 100,
        amount: 100,
        currency: currency,
        receipt: order.id,
        notes: {
            id: order.id,
        }
    })

    return new_order

}

exports.verifyRzpOrder = (id, pay_id, signature) => {
    let body= id + "|" + pay_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'ckRjyLmZByCBiHSed4z5oXSB')
                                    .update(body.toString())
                                    .digest('hex');
    // console.log("sig received " ,req.body.signature);
    // console.log("sig generated " ,expectedSignature);
    return expectedSignature === signature

}