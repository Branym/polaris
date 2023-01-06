import React, { useContext, useEffect, useState } from "react"

import { Container, Row, Col, Breadcrumb, Button, Alert } from "react-bootstrap"

import { FormContext } from "../../../components/FormContext"

import Link from "next/link"
import Icon from "../../../components/Icon"
import { formatPrice } from "../../../services/formatPrice"
import { CartContext } from "../../../components/CartContext"
import { useRouter } from "next/router"
import axios from "axios"
import { viewSingleOrder } from "../../../services/orders"
import { UserContext } from "../../../components/UserContext"

export async function getServerSideProps(context) {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "Order confirmed",
    },
  }
}

const CheckoutConfirmed = () => {
  const [order, setOrder] = useState() // Checkout inputs context
  const {clearCart} = useContext(CartContext)
  const {user} = useContext(UserContext)
  const router = useRouter();
  const today = new Date() // Demo date
  const day = today.getDate() // Demo day
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] // DEMO ONLY - English month names
  const month = months[today.getMonth()] // Demo month
  const year = today.getFullYear() // Demo year

  useEffect(() => {
    clearCart();
    viewSingleOrder(router.query.order_id).then(res => {
      setOrder(res)
    })
  }, [])

  // Order details - fill Order no. & date with real data on production
  return (
    <React.Fragment>
      <section className="hero">
        <Container>
          <Breadcrumb listProps={{ className: "justify-content-center" }}>
            <Link href="/index" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Order confirmed</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content pb-5 text-center">
            <h1 className="hero-heading">Order confirmed</h1>
          </div>
        </Container>
      </section>
      <section className="pb-5">
        <Container className="text-center">
          <div className="icon-rounded bg-primary-light mb-3 mx-auto text-primary">
            <Icon icon="checkmark-1" className="w-2rem h-2rem align-middle" />
          </div>
          <h4 className="mb-3 ff-base">
            Thank you, {user?.first_name}. Your order is confirmed.
          </h4>
          <p className="text-muted mb-5">
            Your order hasn't shipped yet but we will send you ane email when it
            does.
          </p>
          <p className="mb-6">
            <Link href={"/" + order?.channel + "/customer-orders"} passHref>
              <Button variant="outline-dark">View or manage your order</Button>
            </Link>
          </p>
          <div className="p-5 bg-gray-100">
            <Row>
              {[
                  {
                    label: "Order no.",
                    value: order?.id,
                  },
                  {
                    label: "Date",
                    value: order?.created_on,
                  },
                  {
                    label: "Total",
                    value: formatPrice(order?.total, {currency: order?.cart_items[0].currency}),
                  }
                ].map((item) => (
                // Order details
                <Col key={item.label} xs="6" lg="4" className="mb-5 mb-lg-0">
                  <div className="text-sm text-uppercase text-muted mb-3">
                    {item.label}
                  </div>
                  <span className="h5">{item.value}</span>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CheckoutConfirmed
