import React from "react"
import { Nav } from "react-bootstrap"
import Link from "next/link"

import steps from "../data/checkout-steps.json"

const CheckoutNav = ({ activeStep = 1 }) => {
  return (
    <Nav variant="pills" className="custom-nav mb-5">
      {steps.map((step) => {
        const active = step.id === activeStep
        if (step.nav === true)
          return (
            <Nav.Item key={step.id} className="w-25">
              <Link href={step.link} passHref>
                <Nav.Link
                  className={`text-sm ${
                    step.id > activeStep ? "disabled " : ""
                  }`}
                  active={active}
                >
                  {step.name}
                </Nav.Link>
              </Link>
            </Nav.Item>
          )
      })}
    </Nav>
  )
}

export default CheckoutNav
