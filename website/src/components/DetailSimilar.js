import { Row, Col } from "react-bootstrap"

import Product from "./Product"

const DetailSimilar = ({products, channel, currency}) => {
  return (
    <section className="my-5">
      <div className="container">
        <header className="text-center">
          <h6 className="text-uppercase mb-5">You might also like</h6>
        </header>

        <Row>
          {products.map((value, index) => (
            <Col xl="2" lg="2" md="4" xs="6" key={index}>
              <Product currency={currency} channel={channel} data={value} onlyViewButton />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default DetailSimilar
