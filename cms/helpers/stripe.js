const Document = require('../api/cms/model');
const { sendTemplateEmail } = require('./sendgrid');

// function to get stripe handler
exports.getStripeHandler = () => {
    const stripe = require('stripe')('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');
    return stripe;
}

// function to create payment intent
exports.createPaymentIntent = async (amount, currency, order) => {

    const stripeHandler = this.getStripeHandler();

    const response = await stripeHandler.paymentIntents.create({
        amount: amount,
        currency: currency,
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            id: order.id
        },
    })

    return {'client_secret': response.client_secret};
}


exports.verifyPayment = async (request, response) => {

    // This is your test secret API key.
    const stripe = this.getStripeHandler();
    const endpointSecret = 'we_1Ld5T6SBRbuIyU2pIsciR282'

    let event = request.body;

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
        event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
        );
        } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
        }
    }

    console.log("I am working...")

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // console.log(paymentIntent)
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        Document.updateOne({"data.id": paymentIntent.metadata.id, "collection_name": "orders"}, {$set: {
            "data.payment_status": "PAID",
            "data.payment_id": paymentIntent.id
        }}).then(res => {
            console.log(res)
        })

        const order = await Document.findOne({"data.id": paymentIntent.metadata.id, "collection_name": "orders"})
        sendTemplateEmail(order.data.customer.email, {...order.data, currency: order.data.cart_items[0].currency, status_text: "Order Confirmed"} , 'd-7120efb24ef344368d84cdddad4efdff')

        break;
        case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
        default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();

};


