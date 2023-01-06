import { Row, Col } from "react-bootstrap"
import CartItem from "./CartItem"

export default function Cart({ items = [], onIncDec, onRemove, review, revised_items = [], revised }) {
  return (
    <div className="cart">
      <div className="cart-header">
        <Row>
          <Col md="5">Item</Col>
          <Col className="d-none d-md-block">
            <Row>
              <Col md="3">Price</Col>
              <Col md="4">Quantity</Col>
              <Col md="3">Total</Col>
              <Col md="2" />
            </Row>
          </Col>
        </Row>
      </div>
      <div className="cart-body">
        {items.length === 0 ?
          <div className="block">
              <div className="block-body w-100 text-center py-7">
                  <h4 className="text-muted">No Items Found</h4>
              </div>
          </div>
        : items.map((item, index) => (
          <CartItem revised={revised} revised_item = {revised_items[index]} onChange={(quantity) => {onIncDec({...item, quantity}, index)}} crossClick={() => {onRemove(item)}} item={item} key={index} review={review} />
        ))}
      </div>
    </div>
  )
}
