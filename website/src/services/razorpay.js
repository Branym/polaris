import { verifyOrder } from "./orders";

export const openRzp = (id, amount, razorpay, order_id, callback) => {

    var options = {
        "key": "rzp_live_7NDqF1KbFfZTnB", // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Polaris Medifabrics",
        "description": "Order Transaction",
        "image": "/logo.png",
        "order_id": id, 
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "handler": function (response){
            console.log(response);
            verifyOrder({
                rzp_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                pay_id: response.razorpay_payment_id,
                order_id: order_id
            }).then((res) => {
                console.log(res)
                if(res.data.status === "SUCCESS"){
                    callback(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const rzp = new razorpay(options);
    rzp.open()
    rzp.on('payment.failed', function (response){
        alert("Payment Failed " + response.error.description);
    })

};

