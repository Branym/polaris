import React from "react"
import { Col, Row, Container } from "react-bootstrap"
import Icon from "./Icon"

const ServicesBlock = () => {
  const services = [
    {
      icon: "delivery-time-1",
      title: "Free shipping & return",
      content: "Free Shipping over Rs.1500",
    },
    {
      icon: "money-1",
      title: "Money back guarantee",
      content: "30 Days Money Back Guarantee",
    },
    {
      icon: "customer-support-1",
      title: "+91 830 699 8921",
      content: "24/7 Available Support",
    },
  ]
  return (
    <div className="bg-gray-100 text-dark-700 py-6">
      <Container>
        <Row>
          {services.map((service) => (
            <Col lg="4" className="service-column" key={service.title}>
              <Icon icon={service.icon} className="service-icon" />

              <div className="service-text">
                <h6 className="text-uppercase">{service.title}</h6>
                <p className="text-muted fw-light text-sm mb-0">
                  {service.content}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ServicesBlock
