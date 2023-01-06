const axios = require('axios')

exports.authShipRocket = async (data) => {

    var payload = JSON.stringify({
        "email": "polaris.shiprocket@gmail.com",
        "password": "123456"
    });

    var config = {
        method: 'post',
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };

    const loginStatus = await axios(config);
    return loginStatus;

}

exports.createShipRocketOrder = async (response,order) => {
    response = await response;
    console.log("createShipRocketOrder received response:", response);
    console.log("createShipRocketOrder details response:", order);
    order.data.cart_items.forEach(item=>{
        item["units"] = item.quantity;
        item["selling_price"] = item.price;
    });
    console.log("createShipRocketOrder order details updated:", order);
    var payload = JSON.stringify({
        "order_id": order.data.id,
        "order_date": order.data.created_on.split('/').reverse().join('-'),
        "pickup_location": "primary",
        "channel_id": "",
        "comment": "",
        "billing_customer_name": order.data.customer.name,
        "billing_last_name": "",
        "billing_address": order.data.billing_address.address_line_1,
        "billing_address_2": order.data.billing_address.address_line_1,
        "billing_city": order.data.billing_address.city,
        "billing_pincode": order.data.billing_address.pincode,
        "billing_state": order.data.billing_address.state,
        "billing_country": order.data.billing_address.country,
        "billing_email":order.data.customer.email,
        "billing_phone": order.data.customer.phone,
        "shipping_is_billing": true,
        "shipping_customer_name":order.data.customer.email,
        "shipping_last_name":"",
        "shipping_address":order.data.shipping_address.address_line_1,
        "shipping_address_2":"",
        "shipping_city":order.data.shipping_address.city,
        "shipping_pincode":order.data.shipping_address.pincode,
        "shipping_country":order.data.shipping_address.country,
        "shipping_state":order.data.shipping_address.state,
        "shipping_email":order.data.customer.email,
        "shipping_phone": order.data.customer.phone,
        "order_items": order.data.cart_items,
        "payment_method": "Prepaid",
        "shipping_charges": order.data.shipping_charges,
        "giftwrap_charges": 0,
        "transaction_charges": 0,
        "total_discount": order.data.coupon_discount,
        "sub_total": order.data.sub_total,
        "length": 10,
        "breadth": 15,
        "height": 20,
        "weight": 2
    });
 
    var config = {
        method: 'post',
        url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        headers: {
            'Authorization': 'Bearer ' + response.data.token,
            'Content-Type': 'application/json'
        },
        data: payload
    };

    axios(config)
        .then(function (response) {
            console.log("Order placed in shiprocket! ", response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

