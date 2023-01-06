import { Container, Row, Col, Button } from "react-bootstrap"

import Link from "next/link"

import Hero from "../../components/Hero"
import Cart from "../../components/Cart"
import OrderSummary from "../../components/OrderSummary"

import data from "../../data/cart.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

export async function getServerSideProps() {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "Category",
    },
  }
}

export default function ShoppingCart() {
  return (
    <>
      <Hero
        title={data.subtitle}
        breadcrumbs={data.breadcrumbs}
        content={data.content}
      />

      <Container>
        <Row className="mb-5">
          <Col lg="8">
            <Cart />

            <div className="my-5 d-flex justify-content-between flex-column flex-lg-row">
              <Link href="/category" passHref>
                <Button variant="link" className="text-muted">
                  <FontAwesomeIcon icon={faChevronLeft} /> Continue Shopping
                </Button>
              </Link>
              <Link href="/checkout-1">
                <Button variant="dark">
                  Proceed to checkout <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </Link>
            </div>
          </Col>
          <Col lg="4">
            <OrderSummary />
          </Col>
        </Row>
      </Container>
    </>
  )
}
