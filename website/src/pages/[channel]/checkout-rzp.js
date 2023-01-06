import { Container, Row, Col } from "react-bootstrap"
import React, { useContext } from 'react';
import Hero from "../../components/Hero"
import OrderSummary from "../../components/OrderSummary"
import { CartContext } from "../../components/CartContext"
import { ShopContext } from "../../components/ShopContext"
import Cart from "../../components/Cart"
import axios from "axios";
import { useRouter } from "next/router";
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutForm } from "../../components/Stripe/CheckoutForm";
import { FormContext } from "../../components/FormContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_51LSJd7SBRbuIyU2pelYFTsBpFnAWTY4lko9jwGZsYP36I74IaWR7DVOswvr9Z7QTO1Ytirymj98w51xzU7ypFm3f00y2AFIfvJ');

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

  const [formInputs, setFormInputs] = useContext(FormContext);
  const {cart, removeItem, setCart} = React.useContext(CartContext)
  const {channels} = React.useContext(ShopContext)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {

    console.log(formInputs)
    
  }, [])

  const onSubmit = async () => {

      setLoading(true);
      


      
      setLoading(false)
  }

  return (
    <>
      <Hero
        title="Payment"
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
        content='<p class="lead text-muted">Please fill in your card details.</p>'
      />

      <Container className="mb-6">
        <Row>
          <Col xs="12">
            <Cart review onIncDec={(item, index) => {
                    setCart(cart.map((_item, i) => index === i ? item : _item))
              }} onRemove={item => removeItem(item)} items={cart}/>
          </Col>
          </Row>
      </Container>

      {/* Checkout*/}
      <Container>
        <Row>
          <Col lg="8">
            <h3 className="mb-4">Enter your payment details</h3>
            <Elements stripe={stripePromise} options={{
              clientSecret: router.query.secret
            }}>
                <CheckoutForm channel={channel} order_id={formInputs.order_id} onFail={(error) => {
                  console.log(error.message)  
                  alert(error.message)
                }}/>
            </Elements>
          </Col>
          <Col lg="4">
            <OrderSummary
                cart={cart}
                shipping={formInputs.shipping}
                loading={loading}
                channel={channel}
                currency={channels.filter(item => item.slug === channel)[0]?.currency}
                onSubmit={onSubmit}
                review
             />
          </Col>
        </Row>
      </Container>
    </>
  )
}
