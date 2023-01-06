import { Container, Row, Col, Button } from "react-bootstrap"

import CustomerSidebar from "../../components/CustomerSidebar"
import Cart from "../../components/Cart"
import Hero from "../../components/Hero"

import data from "../../data/customer-order.json"
import { useEffect, useState } from "react"
import { viewSingleOrder } from "../../services/orders"
import { useRouter } from "next/router"
import { formatPrice } from "../../services/formatPrice"
import Script from 'next/script'
import Icon from "../../components/Icon"

export async function getServerSideProps(context) {

  const {channel, id = ''} = context.params

  return {
    props: {
      channel,
      id,
      nav: {
        light: true,
      },
      title: "Customer - Order Detail",
      loggedUser: true,
    },
  }
}

export default function CustomerOrder({channel}) {

  const [order, setOrder] = useState({})
  const [currency, setCurrency] = useState('INR')
  const router = useRouter()
  const {id} = router.query;

  useEffect(async () => {

    const _order = await viewSingleOrder(id);
    if(_order?.id){
      setOrder(_order)
      console.log(_order)
      setCurrency(_order?.cart_items[0]?.currency)
    }
    else{
      router.push('/404')
    }

  }, [])

  return (
    <>
      <Script src="/support.js"></Script>
      {order?.id && <Hero
        title={"Order Detail"}
        breadcrumbs={[
          {
            name: "Home",
            link: `/${channel}`
          },
          {
            name: "Orders",
            link: `/${channel}/customer-orders`
          },
          {
            name: order.id,
            link: "#"
          }
        ]}
        content={`<span>
         ${order.id} was placed on ${order.created_on} and is currently ${order.status}.
        </span>`}
      />}

      <Container>

        <Row>
          <Col lg="8" xl="9">
            {order?.status?.includes("FULFILLED") && <Col md="12">
                <div className="block mb-4">
                  <div className="block-body d-flex align-items-center justify-content-between bg-green text-light py-3">
                        <h6 className="mb-0">
                          Your order has been delivered. For further assistance, please contact the support.
                        </h6>
                  </div>
                </div>
            </Col>}
            <Col md="12">
                <div className="block mb-4">
                  <div className="block-body d-flex flex-column flex-lg-row align-items-lg-center align-items-start justify-content-between bg-light py-3">
                        <div>
                          <h5 className="mb-0">
                            Reference Id
                          </h5>
                          <p>You will be asked for this ID during support.</p>
                        </div>
                       <div className="d-flex align-items-center">
                          <h4 className="mb-0">
                              {order?.id} &nbsp;
                          </h4>
                          <Button onClick={(e) => {
                             navigator.clipboard.writeText(order?.id);
                             e.target.innerHTML = "COPIED!"
                          }} variant="outline-dark" size="sm">COPY</Button>
                       </div>
                  </div>
                </div>
              </Col>
            {((order?.status?.includes("REPLACE") ||  order?.status?.includes("RETURNED")) && !order?.status?.includes("FULFILLED")) && <Col md="12">
                <div className="block mb-4">
                  <div className="block-body d-flex align-items-center justify-content-between bg-gray-700 text-light py-3">
                        <h6 className="mb-0">
                          Your order was revised as per your request.
                        </h6>
                  </div>
                </div>
              </Col>}
              {order?.status === "CANCELLED" && <Col md="12">
                <div className="block mb-4">
                  <div className="block-body d-flex align-items-center justify-content-between bg-danger text-white py-3">
                        <h6 className="mb-0">
                          This order was cancelled by admin as per your request. If this was not you, please contact the support.
                        </h6>
                  </div>
                </div>
              </Col>}
            <Cart review revised={order?.status?.includes("REPLACE") ||  order?.status?.includes("RETURNED")} revised_items={order?.revised_items} items={order.cart_items}/>

            <Row className="my-5">
          
         
              {(order.track_link && !["RETURNED", "FULFILLED", "CANCELLED", "PENDING"].includes(order?.status)) && <Col md="12">
                <div className="block mb-4">
                  <div className="block-body d-flex align-items-center justify-content-between bg-light py-3">
                        <h6 className="mb-0">
                          Get live status of your order here.
                        </h6>
                        <Button as="a" href={order.track_link} target="_blank" variant="dark">
                          Track Online
                        </Button>
                  </div>
                </div>
              </Col>}

              <Col md="12">
                <div className="block mb-4">
                  <div className="block-body d-flex flex-column flex-lg-row align-items-center justify-content-between bg-light py-3">
                        <div className="pb-4 py-lg-2">
                          <h5 className="mb-0">
                            Having issues with the order?
                          </h5>
                        </div>
                        <div className="d-flex">
                          <Button id="order_support" className="mr-2" variant="dark">
                            Contact Support
                          </Button>
                          &nbsp;&nbsp;
                          <Button as="a" href="tel:+918306998921" className="mr-0" variant="dark">
                            Call Us
                          </Button>
                        </div>
                  </div>
                </div>
              </Col>

              <Col md="6">
                <div className="block mb-5">
                  <div className="block-header">
                    <h6 className="text-uppercase mb-0">Order Summary</h6>
                  </div>
                  <div className="block-body bg-light pt-1">
                    <p className="text-sm">
                      {/* Shipping and additional costs are calculated based on
                      values you have entered. */}
                    </p>
                    <ul className="order-summary mb-0 list-unstyled">
                      <li className="order-summary-item">
                        <span>Order Subtotal </span>
                        <span>{formatPrice(order.sub_total, {currency: currency})}</span>
                      </li>
                      <li className="order-summary-item">
                        <span>Shipping and handling</span>
                        <span>{formatPrice(order.shipping_charges, {currency: currency})}</span>
                      </li>
                      <li className="order-summary-item">
                        <span>Tax (5%)</span>
                        <span>{formatPrice(order.tax, {currency: currency})}</span>
                      </li>
                      {(order?.status?.includes("REPLACE") ||  order?.status?.includes("RETURNED")) ? <>
                        {order.refunded_amount > 0 &&<li className="order-summary-item border-0">
                        <span>Refunded Amount</span>
                        <span>{formatPrice(order.refunded_amount, {currency: currency})}</span>
                      </li>}
                      {order.refunded_amount > 0 && <li className="order-summary-item border-0">
                        <span>Refund Status</span>
                        <span className="h6">{order.refund_status}</span>
                      </li>}
                      <li className="order-summary-item border-0">
                        <span>Revised Total</span>
                        <span>{formatPrice(order.total - order.refunded_amount, {currency: currency})}</span>
                      </li> 
                      </> : <li className="order-summary-item border-0">
                        <span>Total</span>
                        <span>{formatPrice(order.total, {currency: currency})}</span>
                      </li> }
                  
                    </ul>
                  </div>
                </div>
              </Col>
              {order?.id && <Col md="6">
                <div className="block-header">
                  <h6 className="text-uppercase mb-0">Invoice address</h6>
                </div>
                <div className="block-body bg-light pt-1">
                  <p>
                    {order.customer.name}
                    <br />
                    {order.billing_address.address_line_1}
                    {order.billing_address.address_line_2 && <br/>}
                    {order.billing_address.address_line_2}
                    <br />
                    {order.billing_address.city}
                    <br />
                    {order.billing_address.pincode}
                    <br />
                    <strong>{order.billing_address.state}, {order.billing_address.country}</strong>
                  </p>
                </div>
                <div className="block-header">
                  <h6 className="text-uppercase mb-0">Shipping address</h6>
                </div>
                <div className="block-body bg-light pt-1">
                  <p>
                    {order.shipping_address.address_line_1}
                    {order.shipping_address.address_line_2 && <br/>}
                    {order.shipping_address.address_line_2}
                    <br />
                    {order.shipping_address.city}
                    <br />
                    {order.shipping_address.pincode}
                    <br />
                    <strong>{order.shipping_address.state}, {order.shipping_address.country}</strong>
                  </p>
                </div>
              </Col>}
            </Row>
          </Col>

          <CustomerSidebar />
        </Row>
      </Container>
    </>
  )
}
