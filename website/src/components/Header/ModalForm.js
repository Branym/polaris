import React, { useState, useRef } from "react"
import { Nav } from "react-bootstrap"
import { Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"
import Icon from "../Icon"

const ModalForm = ({  }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Nav.Item className="nav-item">
          {/* User Not Logged - link to login page*/}
          <div
            className="nav-item navbar-icon-link"
            data-toggle="search"
            onClick={handleShow}
          >
            <Icon icon="male-user-1" />

            <span className="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">
              Log in
            </span>
          </div>
        </Nav.Item>
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
    >
      <button
        className="close modal-close"
        type="button"
        onClick={handleClose}
        aria-label="Close"
      >
        <Icon
          icon="close-1"
          className="w-100 h-100 svg-icon-light align-middle"
        />
      </button>

      <Modal.Body className="p-0">
      <Row className="justify-content-lg-center">
          <Col lg="6" className="bg-gray-100">

          </Col>
          <Col lg="6" className="py-7 px-lg-6"> 
            <div className="block p-0 mb-4">
                <h3 className="text-uppercase mb-2">Login</h3>
                <p className="lead">Not our customer yet? <a href="#">Sign Up</a></p>
            </div>
            <div className="block px-4 px-lg-0">
                <Form>
                  {/* <div className="mb-4">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control id="name" type="text" />
                  </div> */}
                  <div className="mb-4">
                    {/* <Form.Label htmlFor="email">Email</Form.Label> */}
                    <Form.Control placeholder="Email" id="email" type="text" />
                  </div>
                  <div className="mb-4">
                    {/* <Form.Label htmlFor="passwordRegister">Password</Form.Label> */}
                    <Form.Control id="passwordRegister" placeholder="Password" type="password" />
                  </div>
                  <div className="mb-4">
                    <Button variant="outline-dark" type="submit">
                      {/* <FontAwesomeIcon className="me-2" /> */}
                      Login
                    </Button>
                  </div>
                </Form>
              </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default ModalForm
