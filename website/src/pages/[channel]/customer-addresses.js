import { faSave } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Container, Row, Col, Form, Button, Collapse } from "react-bootstrap"

import CustomerSidebar from "../../components/CustomerSidebar"
import Hero from "../../components/Hero"

import data from "../../data/customer-addresses.json"

export async function getServerSideProps() {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "Customer - Addresses",
      loggedUser: true,
    },
  }
}

export default function CustomerAddresses() {
  const [collapse, setCollapse] = useState(false)

  return (
    <>
      <Hero title={data.subtitle} breadcrumbs={data.breadcrumbs} />

      <Container>
        <Row className="mb-5">
          <Col lg="8" xl="9">
            <Form>
              <div className="block">
                <div className="block-header">
                  <h6 className="text-uppercase mb-0">Invoice address </h6>
                </div>
                <div className="block-body">
                  <Row>
                    <Col md="6" className="mb-4">
                      <Form.Label
                        className="form-label"
                        htmlFor="fullname_invoice"
                      >
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fullname_invoice"
                        placeholder="Joe Black"
                        id="fullname_invoice"
                      />
                    </Col>
                    <Col md="6" className="mb-4">
                      <Form.Label
                        className="form-label"
                        htmlFor="emailaddress_invoice"
                      >
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="emailaddress_invoice"
                        placeholder="joe.black@gmail.com"
                        id="emailaddress_invoice"
                      />
                    </Col>
                    <Col md="6" className="mb-4">
                      <Form.Label
                        className="form-label"
                        htmlFor="street_invoice"
                      >
                        Street
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="street_invoice"
                        placeholder="123 Main St."
                        id="street_invoice"
                      />
                    </Col>
                    <Col md="6" className="mb-4">
                      <Form.Label className="form-label" htmlFor="city_invoice">
                        City
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="city_invoice"
                        placeholder="City"
                        id="city_invoice"
                      />
                    </Col>
                    <Col md="6" className="mb-4">
                      <Form.Label className="form-label" htmlFor="zip_invoice">
                        ZIP
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="zip_invoice"
                        placeholder="Postal code"
                        id="zip_invoice"
                      />
                    </Col>
                    <Col md="6" className="mb-4">
                      <Form.Label
                        className="form-label"
                        htmlFor="state_invoice"
                      >
                        State
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="state_invoice"
                        placeholder="State"
                        id="state_invoice"
                      />
                    </Col>
                    <Col md="6" className="mb-4">
                      <Form.Label
                        className="form-label"
                        htmlFor="phonenumber_invoice"
                      >
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="phonenumber_invoice"
                        placeholder="Phone Number"
                        id="phonenumber_invoice"
                      />
                    </Col>
                    <Col xs="12" className="mb-4 mt-3">
                      <div className="custom-control custom-checkbox">
                        <Form.Check
                          className="custom-control-input"
                          id="show-shipping-address"
                          type="checkbox"
                          name="clothes-brand"
                          onClick={() => setCollapse(!collapse)}
                          label="Use a different shipping address"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <Collapse in={collapse}>
                  <div className="block">
                    <div className="block-header">
                      <h6 className="text-uppercase mb-0">Shipping address </h6>
                    </div>
                    <div className="block-body">
                      <Row>
                        <Col md="6" className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="street_shipping"
                          >
                            Street
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="street_shipping"
                            placeholder="123 Main St."
                            id="street_shipping"
                          />
                        </Col>
                        <Col md="6" className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="city_shipping"
                          >
                            City
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="city_shipping"
                            placeholder="City"
                            id="city_shipping"
                          />
                        </Col>
                        <Col md="6" className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="zip_shipping"
                          >
                            ZIP
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="zip_shipping"
                            placeholder="Postal code"
                            id="zip_shipping"
                          />
                        </Col>
                        <Col md="6" className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="state_shipping"
                          >
                            State
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="state_shipping"
                            placeholder="State"
                            id="state_shipping"
                          />
                        </Col>
                        <Col md="6" className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="phonenumber_shipping"
                          >
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="phonenumber_shipping"
                            placeholder="Phone Number"
                            id="phonenumber_shipping"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="mb-4 mt-3 text-center">
                <Button variant="outline-dark" type="submit">
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  Save changes
                </Button>
              </div>
            </Form>
          </Col>
          <CustomerSidebar />
        </Row>
      </Container>
    </>
  )
}
