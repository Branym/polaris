import { Row, Col, Form, OverlayTrigger, Popover } from "react-bootstrap"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { formatPrice } from "../services/formatPrice"


const ViewImage =  ({image}) => {
  return <span className="position-relative">
  <a className="view-image">View Image</a>
  <div className="display-logo shadow-md bg-white border">
      <img height={"250px"} width="250px" src={image}></img>
  </div>
  </span>
}

const CartItem = ({ item, onChange, crossClick, review, revised_item, revised }) => {
  const [quantity, setQuantity] = useState(item.quantity > item.stock ? item.stock : item.quantity)
  const [attributes, setAttr] = useState([])
  
  const handleQuantity = (q) => {
    setQuantity(q);
    onChange(q);
  }

  useEffect(() => {
      setAttr(item?.sub_products?.length > 0 ? [
        {
          name: "Color",
          value: item.variant_name
        },
        {
          name: "Size",
          value: item.information.size
        },
        {
          name: "Embroidery",
          value: item.sub_products[0].variant_name
        },
        {
          name: item.sub_products[0].information.text.includes('https://') ? "Logo" : "Text",
          value: item.sub_products[0].information.text.includes('https://') ?
             <ViewImage image={item.sub_products[0].information.text}></ViewImage> : item.sub_products[0].information.text
        }
      ] : [
        {
          name: "Color",
          value: item.variant_name
        },
        {
          name: "Size",
          value: item.information.size
        }
      ])

  }, [])

  return (
    <div className="cart-item">
      <Row className=" d-flex align-items-center text-start text-md-center">
        <Col xs="12" md="5">
          <a onClick={crossClick} className="cart-remove close mt-3 d-md-none" href="#">
            <FontAwesomeIcon icon={faTimes} />
          </a>
          <div className="d-flex align-items-center">
              <a>
                <img className="cart-item-img" src={item.img} alt="..." />
              </a>
            <div className="cart-title text-start">
                <a className="text-uppercase text-dark">
                  <strong>{item.name}</strong>
                </a>
              {attributes &&
                attributes.map((attribute, index) => (
                  <div className="text-muted text-sm" key={index}>
                    {attribute.name}: {attribute.value}
                  </div>
                ))}
            </div>
          </div>
        </Col>
        <Col xs="12" md="7" className="mt-4 mt-md-0">
          <Row className="align-items-center">
            <Col md="3">
              <Row>
                <Col xs="6" className="d-md-none text-muted">
                  Price per item
                </Col>
                <Col xs="6" md="12" className="text-end text-md-center">
                  {formatPrice(item.price, {currency: item.currency})}
                </Col>
              </Row>
            </Col>
            <Col md="4">
              <Row className="align-items-center">
                <Col xs="7" sm="9" className="d-md-none text-muted">
                  Quantity
                </Col>
                <Col xs="5" sm="3" md="12">
                  {review ? 
                    revised ?
                    <h6>
                      {revised_item.quantity} / {quantity} <br/>
                      ({revised_item.replace ? "Replaced" : "Returned"})
                    </h6>
                    : quantity
                   : (
                    <div className="d-flex align-items-center">
                      <div
                        className="btn btn-items btn-items-decrease"
                        onClick={() =>
                          quantity > 1 && handleQuantity(quantity - 1)
                        }
                      >
                        -
                      </div>
                      <Form.Control
                        className="text-center border-0 border-md input-items"
                        type="text"
                        disabled
                        value={quantity}
                        onChange={(e) =>{
                            setQuantity(parseInt(e.target.value)) 
                        }}
                      />
                      <div
                        className="btn btn-items btn-items-increase"
                        onClick={(e) => quantity < 20 && handleQuantity(quantity + 1)}
                      >
                        +
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md="3">
              <Row>
                <Col xs="6" className="d-md-none text-muted">
                  Total price
                </Col>
                <Col xs="6" md="12" className="text-end text-md-center">
                {formatPrice(item.price * item.quantity, {currency: item.currency})}
                </Col>
              </Row>
            </Col>
            {!review && (
              <Col xs="2" className="d-none d-md-block text-center">
                <a onClick={crossClick} className="cart-remove" href="#">
                  <FontAwesomeIcon icon={faTimes} className="delete" />
                </a>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CartItem
