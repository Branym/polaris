import React, { useState, useRef } from "react"

import { Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap"

import Stars from "./Stars"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import Icon from "./Icon"
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons"
import Image from "./CustomImage"

const ModalQuickView = ({ quickView, setQuickView, product }) => {
  const [button, setButton] = useState(false)
  const [size, setSize] = useState("size_0")
  const swiperRef = useRef(null)
  const [inputs, setInputs] = useState({})
  const [currentIndex, updateCurrentIndex] = useState(0)

  const params = {
    on: {
      slideChange: () => updateCurrentIndex(swiperRef.current.swiper.realIndex),
    },
  }
  const slideTo = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index + 1)
      updateCurrentIndex(index)
    }
  }
  const onChange = (e) => {
    const value = e.target.value
    setInputs({ ...inputs, [e.target.name]: value })
  }

  const sizes = [
    {
      label: "Small",
      id: "size_0",
      group: "size",
    },
    {
      label: "Medium",
      id: "size_1",
      group: "size",
    },
    {
      label: "Large",
      id: "size_2",
      group: "size",
    },
  ]

  const types = [
    {
      label: "Hoodie",
      id: "material_0_modal",
      group: "material",
    },
    {
      label: "College",
      id: "material_1_modal",
      group: "material",
    },
  ]
  return (
    <Modal
      show={quickView}
      onHide={() => setQuickView(false)}
      size="xl"
      className="quickview"
    >
      <button
        className="close modal-close"
        type="button"
        onClick={() => setQuickView(false)}
        aria-label="Close"
      >
        <Icon
          icon="close-1"
          className="w-100 h-100 svg-icon-light align-middle"
        />
      </button>

      <Modal.Body className="quickview-body">
        <div className="ribbon ribbon-info">Fresh</div>
        <div className="ribbon ribbon-primary">Sale</div>
        <Row>
          <Col lg="6">
            <div className="detail-carousel">
              <Swiper {...params} loop ref={swiperRef}>
                {product.img.detail.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      className="img-fluid"
                      src={image.img}
                      alt={image.alt}
                      width={539}
                      height={539}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-thumbs">
                {product.img.detail.map((image, index) => (
                  <button
                    key={image.img}
                    onClick={() => slideTo(index)}
                    className={`swiper-thumb-item detail-thumb-item ${
                      currentIndex === index ? "active" : ""
                    }`}
                  >
                    <Image
                      className="img-fluid"
                      src={image.img}
                      alt={image.alt}
                      width={98}
                      height={98}
                    />
                  </button>
                ))}
              </div>
            </div>
          </Col>
          <Col lg="6" className="p-lg-5">
            <h2 className="mb-4 mt-4 mt-lg-1">{product.name}</h2>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
              <ul className="list-inline mb-2 mb-sm-0">
                <li className="list-inline-item h4 fw-light mb-0">
                  ${product.price.toFixed(2)}
                </li>
                <li className="list-inline-item text-muted fw-light">
                  <del>$90.00</del>
                </li>
              </ul>
              <div className="d-flex align-items-center text-sm">
                <Stars
                  stars={product.stars}
                  className="me-2 mb-0"
                  starClass="me-1"
                  secondColor="gray-300"
                />
                <span className="text-muted text-uppercase">25 reviews</span>
              </div>
            </div>
            <p className="mb-4 text-muted">
              Samsa was a travelling salesman - and above it there hung a
              picture that he had recently cut out of an illustrated magazine
              and housed in a nice, gilded frame.
            </p>
            <Form onSubmit={() => setQuickView(false)}>
              <Row>
                <Col sm="6" lg="12" className="detail-option mb-4">
                  <h6 className="detail-option-heading">
                    Size <span>(required)</span>
                  </h6>
                  {sizes.map((item) => (
                    <Button
                      key={item.id}
                      size="sm"
                      variant="outline-secondary"
                      as="label"
                      className={`detail-option-btn-label me-1 ${
                        size === item.id ? "active" : ""
                      }`}
                      htmlFor={item.id}
                    >
                      {item.label}
                      <input
                        className="input-invisible"
                        type="radio"
                        name={item.group}
                        id={item.id}
                        onChange={() => setSize(item.id)}
                        required
                      />
                    </Button>
                  ))}
                </Col>
                <Col sm="6" lg="12" className="detail-option mb-4">
                  <h6 className="detail-option-heading">
                    Type <span>(required)</span>
                  </h6>
                  {types.map((type) => (
                    <Button
                      key={type.id}
                      as="label"
                      variant="outline-secondary"
                      className={`detail-option-btn-label me-1 ${
                        button === type.id ? "active" : ""
                      }`}
                      size="sm"
                      htmlFor={type.id}
                      onClick={() => setButton(type.id)}
                    >
                      {type.label}
                      <Form.Control
                        className="input-invisible"
                        type="radio"
                        name={type.group}
                        id={type.id}
                        required
                      />
                    </Button>
                  ))}
                </Col>
              </Row>
              <InputGroup className="w-100 mb-4">
                <Form.Control
                  size="lg"
                  className="detail-quantity"
                  name="items"
                  type="number"
                  value={(inputs.items > 0 && inputs.items) || 1}
                  onChange={(e) => onChange(e)}
                />

                <Button variant="dark" className=" flex-grow-1">
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                  Add to Cart
                </Button>
              </InputGroup>
              <Row className="mb-4">
                <Col xs="6">
                  <a href="#" className="text-muted">
                    <FontAwesomeIcon icon={faHeart} className="me-2" />
                    Add to wishlist
                  </a>
                </Col>
                <Col xs="6" className="text-end">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-2">
                      <a className="text-dark text-hover-primary" href="#">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="text-dark text-hover-primary" href="#">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ModalQuickView
