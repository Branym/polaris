import { Container, Row, Col } from "react-bootstrap"

import Hero from "../../components/Hero"
import OrderSummary from "../../components/OrderSummary"

import data from "../../data/checkout-2.json"
import CheckoutNav from "../../components/CheckoutNav"
import FormCheckout from "../../components/FormCheckout"

export async function getServerSideProps() {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "Checkout - Step 4",
    },
  }
}

export default function Checkout4({channel}) {
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
        content='<p class="lead text-muted">Please review your order.</p>'
      />

      {/* Checkout*/}
      <Container>
        <Row>
          <Col lg="8">
            <CheckoutNav channel={channel} activeStep={4} />

            <FormCheckout
              step={4}
              channel={channel}
              prev={["Back to the payment method", "/checkout-3"]}
              next={["Place an order", "/checkout-confirmed"]}
            />
          </Col>
          <Col lg="4">
            <OrderSummary />
          </Col>
        </Row>
      </Container>
    </>
  )
}
