import React, { useContext, useEffect } from "react"

import { Container, Row, Col, Breadcrumb, Button, Alert } from "react-bootstrap"

import { FormContext } from "../../components/FormContext"

import Link from "next/link"
import Icon from "../../components/Icon"
import { formatPrice } from "../../services/formatPrice"
import { CartContext } from "../../components/CartContext"
import { useRouter } from "next/router"
export async function getServerSideProps() {
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

  return (
    <React.Fragment>
      <section className="hero">
        <Container>
          <Breadcrumb listProps={{ className: "justify-content-center" }}>
            <Link href="/index" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Response Submitted</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content pb-5 text-center">
            <h1 className="hero-heading">Query Received</h1>
          </div>
        </Container>
      </section>
      <section className="pb-5">
        <Container className="text-center">
          <div className="icon-rounded bg-primary-light mb-3 mx-auto text-primary">
            <Icon icon="checkmark-1" className="w-2rem h-2rem align-middle" />
          </div>
          <h4 className="mb-3 ff-base">
            Thank you. Your query has been sent to out team.
          </h4>
          <p className="text-muted mb-5">
            We will get back to you shortly.
          </p>
          <p className="mb-6">
            <Link href="/" passHref>
              <Button variant="outline-dark">Go To Homepage</Button>
            </Link>
          </p>

        </Container>
      </section>
    </React.Fragment>
  )
}

export default CheckoutConfirmed
