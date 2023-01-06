import { Container, Row, Col, Badge, Table, Button } from "react-bootstrap"

import CustomerSidebar from "../../components/CustomerSidebar"
import Hero from "../../components/Hero"

import data from "../../data/customer-orders.json"
import Link from "next/link"
import { viewAllOrders } from "../../services/orders"
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../components/ShopContext"
import { formatPrice } from "../../services/formatPrice"
import OrderPagination from "../../components/OrderPagination"
import { useRouter } from "next/router"

const status = {
  "PENDING": "gray",
  "CANCELLED": "danger",
  "FULFILLED": "success",
  "REVISED": "gray",
  "ON THE WAY": "warning",
}

export async function getServerSideProps(context) {

  const {channel} = context.params

  return {
    props: {
      channel,
      nav: {
        light: true,
      },
      title: "Customer - Orders",
      loggedUser: true,
    },
  }
}

export default function CustomerOrders({channel, page}) {

  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const {channels} = useContext(ShopContext);
  const router = useRouter();

  useEffect(async () => {
    const data = await viewAllOrders(router.query.page || 1, channel)
    setTotal(data.total)
    setOrders(data.orders)
  }, [router])

  return (
    <>
      <Hero
        title={data.subtitle}
        breadcrumbs={data.breadcrumbs}
        content={data.content}
      />

      <Container>
        <Row>
          {total === 0 ? <Col lg="8" xl="9">
            <h1 className="py-6 text-gray-300">No Orders Found...</h1>
          </Col> : <>
          <Col className="d-lg-none d-block" lg="8" xl="9">
                {orders.map(order => <div className="bg-light justify-content-between d-flex p-4 my-3">
                      <div>
                        <h4 className="mb-0">{order?.id}</h4>
                        <h6 className={"mb-0 py-2 text-uppercase text-small text-" + status[order.status]}>{order?.status}</h6>
                        <p className="mb-0">Created On {order?.created_on}</p>
                      </div>
                      <div className="ml-auto">
                        <Link href={'/' + channel + "/customer-order?id=" + order.id}>
                          <Button variant="dark" size="md">
                            View
                          </Button>
                        </Link>
                      </div>
                </div>)}
          </Col>
          <Col className="d-none d-lg-block" lg="8" xl="9">
            <Table responsive borderless hover className="table-responsive-md">
              <thead className="bg-light">
                <tr>
                  <th className="py-4 text-uppercase text-sm">Order #</th>
                  <th className="py-4 text-uppercase text-sm">Date</th>
                  <th className="py-4 text-uppercase text-sm">Total</th>
                  <th className="py-4 text-uppercase text-sm">Status</th>
                  <th className="py-4 text-uppercase text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order.id}>
                  <th className="py-4 align-middle">#{order.id}</th>
                  <td className="py-4 align-middle">{order.created_on}</td>
                  <td className="py-4 align-middle">{formatPrice(order.total, {currency: channels?.filter(item => item.slug === channel)[0]?.currency})}</td>
                  <td className="py-4 align-middle">
                    <h6
                      // text={status === "CANCELLED" ? "gray-100": "dark"}
                      className={"p-2 text-uppercase text-" + status[order.status]}
                    >
                      {order.status}
                    </h6>
                  </td>
                  <td className="py-4 align-middle">
                    <Link href={'/' + channel + "/customer-order?id=" + order.id}>
                      <Button variant="outline-dark" size="sm">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>)}
              </tbody>
            </Table>
            <OrderPagination channel={channel} limit={10} total={total} page={router?.query?.page} />
          </Col></>}
          <CustomerSidebar />
        </Row>
      </Container>
    </>
  )
}
