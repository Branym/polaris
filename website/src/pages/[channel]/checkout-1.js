import { Container, Row, Col } from "react-bootstrap"
import React from 'react';
import Script from "next/script"
import Hero from "../../components/Hero"
import FormCheckout from "../../components/FormCheckout"
import OrderSummary from "../../components/OrderSummary"
import { CartContext } from "../../components/CartContext"
import { ShopContext } from "../../components/ShopContext"
import { UserContext } from "../../components/UserContext"
import { FormContext } from "../../components/FormContext"
import Cart from "../../components/Cart"
import axios from "axios";
import { editUserProfile } from "../../services/initials";
import { openRzp } from "../../services/razorpay";
import { useRouter } from "next/router";

const checkoutSteps = [
  {
    step: 1,
    next: {
      name: "Back",
      link: ""
    }
  }
]

export async function getServerSideProps(context) {

  const {channel} = context.params

  return {
    props: {
      channel,
      nav: {
        light: true,
      },
      title: "Checkout - Step 1",
    },
  }
}

export default function Checkout1({channel, ...props}) {

  const {cart, removeItem,clearCart, setCart} = React.useContext(CartContext)
  const {channels} = React.useContext(ShopContext)
  const {user} = React.useContext(UserContext)
  const [formInputs, setFormInputs] = React.useContext(FormContext)
  const [shipping, setShipping] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const router = useRouter()

  React.useEffect(() => {


    setFormInputs({
      address_line_1 : '',
      city : '',
      state : '',
      country : '',
      pincode : '',
      address_line_2 : '',
      'shipping.address_line_1' : '',
      'shipping.city' : '',
      'shipping.state' : '',
      'shipping.country' : '',
      'shipping.pincode' : '',
      'shipping.address_line_2' : '',
    })

    //Get Shipping Charges
    axios.post('/collections/shipping/get_one?slug=default', {}).then((result) => {
      setShipping(result.data.data.data);
    })
    
  }, [])

  const onSubmit = async () => {

      setLoading(true);
      var err = {};

      const setErr = (e) => {err = e}

      console.log(formInputs.address_line_1 === '')

      //Adress Line 1 and City State Country
      if(formInputs.address_line_1 === ''){
        setErr({...err, address_line_1: "Address Line 1 is required."})
      }

      if(formInputs.state === ''){
        setErr({...err, state: "State is required."})
      }

      if(formInputs.city === ''){
        setErr({...err, city: "City is required."})
      }

      if(formInputs.country === ''){
        setErr({...err, country: "Country is required."})
      }

      if(formInputs.pincode === ''){
        setErr({...err, pincode: "Pin Code is required."})
      }
      else{
         //Validate Pincode
        const res = await fetch('https://api.postalpincode.in/pincode/' + formInputs.pincode);
        const pin_details = await res.json();
        console.log(pin_details[0].Status)
        if(pin_details[0].Status !== 'Success') setErr({...err, pincode: "Pin Code is not valid."})
      }

      //Same for Shipping
      if(formInputs['show-shipping-address'] === true){

        if(formInputs['shipping.address_line_1'] === ''){
          setErr({...err, 'shipping.address_line_1': "Address Line 1 is required."})
        }

        if(formInputs['shipping.city'] === ''){
          setErr({...err, 'shipping.city': "City is required."})
        }

        if(formInputs['shipping.state'] === ''){
          setErr({...err, 'shipping.state': "State is required."})
        }

        if(formInputs['shipping.country'] === ''){
          setErr({...err, 'shipping.country': "Country is required."})
        }

        if(formInputs['shipping.pincode'] === ''){
          setErr({...err, 'shipping.pincode': "Pin Code is required."})
        }
        else{
          const res = await fetch('https://api.postalpincode.in/pincode/' + formInputs['shipping.pincode']);
          const pin_details_ = await res.json();
          console.log(pin_details_[0].Status)
          if(pin_details_[0].Status !== 'Success') setErrors({...err, 'shipping.pincode': "Pin Code is not valid."})
        }

      }

      setErrors(err)

      if(Object.entries(err).length > 0){
        setLoading(false)
        return 0
      }
    

      //IF No Errors Continue
      var payload = {};
      payload = {
        ...user,
        address_line_1: formInputs['address_line_1'],
        city: formInputs['city'],
        state: formInputs['state'],
        country: formInputs['country'],
        pincode: formInputs['pincode'],
        address_line_2: formInputs['address_line_2'],
        shipping: formInputs['show-shipping-adress'] ? {
          address_line_1:  formInputs['shipping.address_line_1'],
          city: formInputs['shipping.city'],
          state: formInputs['shipping.state'],
          country: formInputs['shipping.country'],
          pincode: formInputs['shipping.pincode'],
          address_line_2: formInputs['shipping.address_line_2']
        } : {
          address_line_1: formInputs['address_line_1'],
          city: formInputs['city'],
          state: formInputs['state'],
          country: formInputs['country'],
          pincode: formInputs['pincode'],
          address_line_2: formInputs['address_line_2']
        },
        cart_items: cart
      }

      console.log(payload)

      //Save Address in Customer's DB
      await editUserProfile(payload)

      const order = await axios.post('/products/create_order', {
        cust_id: user.cust_id,
        channel: channel,
        shipping_zone: 'default',
        cod: formInputs['payment'] === 'pay-cod' ? true : false
      })

      if(formInputs['payment'] === 'pay-cod'){
        setFormInputs({
          order_id: order.data.data.id,
          channel: channel,
          currency: channels.filter(item => item.slug === channel)[0]?.currency,
          total: order.data.data.total
        })
        router.push('/' + channel + '/' +  order.data.data.id + '/success')
      }
      else{
        setFormInputs({
          order_id: order.data.data.id,
          channel: channel,
          currency: channels.filter(item => item.slug === channel)[0]?.currency,
          shipping: shipping,
          total: order.data.data.total
        })
        console.log(order.data.data)
        openRzp(order.data.data.rzp.id, order.data.data.total, window.Razorpay, order.data.data.id, (res) => {
          router.push('/' + channel + '/' +  order.data.data.id + '/success')
        })
        
        // router.push('/' + channel + '/checkout-rzp?secret=' + order.data.data.client_secret)
      }
      
      setLoading(false)
  }

  return (
    <>
      <Hero
        title="Checkout"
        breadcrumbs={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Checkout",
            active: true,
          },
        ]}
        content='<p class="lead text-muted">Please fill in your address & choose payment method.</p>'
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <Script src="/order.js"></Script>
      <Container className="mb-6">
        <Row>
          <Col xs="12">
            <Cart onIncDec={(item, index) => {
                    setCart(cart.map((_item, i) => index === i ? item : _item))
              }} onRemove={item => removeItem(item)} items={cart}/>
          </Col>
          </Row>
      </Container>

      {/* Checkout*/}
      <Container>
        <Row>
          <Col lg="8">
            {/* <CheckoutNav channel={channel} activeStep={1} /> */}

            <FormCheckout
              step={1}
              errors={errors}
              cart={cart}
              channel={channel}
              prev={["Back", "/cart"]}
              next={["Choose delivery method", "/checkout-2"]}
            />
          </Col>
          <Col lg="4">
            <OrderSummary
                cart={cart}
                shipping={shipping}
                loading={loading}
                channel={channel}
                currency={channels.filter(item => item.slug === channel)[0]?.currency}
                onSubmit={onSubmit}
             />
          </Col>
        </Row>
      </Container>
    </>
  )
}
