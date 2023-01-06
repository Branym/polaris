import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useContext, useEffect} from "react";
import { Button } from "react-bootstrap";
import { formatPrice } from "../services/formatPrice";

const OrderSummary = ({cart, shipping, channel, currency, review=false, onSubmit, loading}) => {

  return (
    <div className="block mb-5">
      <div className="block-header">
        <h6 className="text-uppercase mb-0">Order Summary</h6>
      </div>
      <div className="block-body bg-light pt-1">
        <p className="text-sm">
          Shipping and additional costs are calculated based on values you have
          entered.
        </p>
        <ul className="order-summary mb-0 list-unstyled">
          <li className="order-summary-item">
            <span>Order Subtotal </span>
            <span>{formatPrice(cart?.reduce((total, item) => total + (item.price * item.quantity), 0), {currency})}</span>
          </li>
          <li className="order-summary-item">
            <span>Shipping and handling</span>
           {shipping?.rate && <span>{formatPrice(cart?.reduce((total, item) => total + (item.weight * item.quantity * shipping?.rate[channel]), 0), {currency})}</span>}
          </li>
          <li className="order-summary-item">
            <span>Tax</span>
            <span>{formatPrice(cart?.reduce((total, item) => total + (item.price * item.quantity * .05), 0), {currency})}</span>
          </li>
          <li className="order-summary-item border-0">
            <span>Total</span>
            {shipping?.rate &&<strong className="order-summary-total">{formatPrice(cart?.reduce((total, item) => total + (item.price * item.quantity * 1.05) + (item.weight * item.quantity * shipping?.rate[channel]), 0), {currency})}</strong>}
          </li>
        </ul>
        {!review && <div className="block-body bg-light">
          <Button disabled={loading} onClick={() => {
            onSubmit()
          }} variant="dark" className="w-100">
            {loading ? "Preparing..." : "Proceed to Pay"}
            {/* <FontAwesomeIcon icon={faAngle} className="ms-2" /> */}
          </Button>
      </div>}
      </div>
    </div>
  );
};

export default OrderSummary;
