import { Container, Row, Col } from "react-bootstrap"

import Hero from "../../components/Hero"
import OrderSummary from "../../components/OrderSummary"

import CheckoutNav from "../../components/CheckoutNav"
import FormCheckout from "../../components/FormCheckout"

export async function getServerSideProps() {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "Checkout - Step 3",
    },
  }
}

export default function Checkout3({channel}) {
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
        content='<p class="lead text-muted">Choose the payment method.</p>'
      />

      {/* Checkout*/}
      <Container>
        <Row>
          <Col lg="8">
            <CheckoutNav channel={channel} activeStep={3} />

            <FormCheckout
            channel={channel}
              step={3}
              prev={["Back to the delivery method", "/checkout-2"]}
              next={["Continue to order review", "/checkout-4"]}
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
