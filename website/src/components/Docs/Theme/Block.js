import React from "react"
import { Form, Row, Col } from "react-bootstrap"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

const Block = () => {
  return (
    <div id="block" className="docs-item element">
      <h5 className="text-uppercase mb-4">Block</h5>
      <div className="docs-desc">
        <p className="lead">
          Similar to a card but with adjusted paddings, no borders and a light
          gray header. Used as a container for form areas, etc.
        </p>
      </div>
      <div className="mt-5">
        <div className="block">
          <div className="block-header" role="tab">
            <h6 className="text-uppercase mb-0">Block header</h6>
          </div>
          <div className="block-body">
            <Form action="#">
              <Row>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-name">Name on Card</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    name="card-name"
                    placeholder="Name on card"
                    id="card-name"
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-number">Card Number</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    name="card-number"
                    placeholder="Card number"
                    id="card-number"
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {highlightCode}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default Block

const highlightCode = `import { Form, Row, Col } from "react-bootstrap";

const Component = () => {
  <div className="block">
    <div className="block-header" role="tab">
      <h6 className="text-uppercase mb-0">Block header</h6>
    </div>
    <div className="block-body">
      <Form action="#">
        <Row>
          <Col md="6" className="mb-4">
            <Form.Label htmlFor="card-name">Name on Card</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="card-name"
              placeholder="Name on card"
              id="card-name"
            />
          </Col>
          <Col md="6" className="mb-4">
            <Form.Label htmlFor="card-number">Card Number</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="card-number"
              placeholder="Card number"
              id="card-number"
            />
          </Col>
        </Row>
      </Form>
    </div>
  </div>
}

export default Component
`
