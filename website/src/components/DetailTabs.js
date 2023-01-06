import React, { useState } from "react"
import { Container, Nav, Tab, Row, Col, Table } from "react-bootstrap"

import Stars from "./Stars"
import ReviewForm from "./ReviewForm"
import Editor from "./Editor"

const DetailTabs = ({ product, reviews }) => {
  // const groupByN = (n, data) => {
  //   let result = []
  //   for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
  //   return result
  // }

  // const groupedAdditionalInfo = groupByN(4, product.additionalinfo)

  return (
    <section className="mt-5">
      <Container>
        <Tab.Container defaultActiveKey="first">
          <Nav variant="tabs" className="flex-column flex-sm-row">
            <Nav.Item>
              <Nav.Link
                eventKey="first"
                className="detail-nav-link"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Description
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link
                eventKey="second"
                className="detail-nav-link"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Additional Information
              </Nav.Link>
            </Nav.Item> */}
            {/* <Nav.Item>
              <Nav.Link
                eventKey="third"
                className="detail-nav-link"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Reviews
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
          <Tab.Content className="py-4">
            <Tab.Pane eventKey="first" className="px-3">
              <Row>
                <Col
                  md="7"
                  xl="8"
                >
                  <Editor value={product.description}></Editor>
                </Col>
                <Col md="5" xl="4">
                  {/* <img
                    className="img-fluid"
                    src={product.description.image}
                    alt={product.name}
                  /> */}
                </Col>
              </Row>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="second">
              <Row>
                {groupedAdditionalInfo.map((infoBlock, index) => (
                  <Col key={index} md="6">
                    <Table className="text-sm">
                      <tbody>
                        {infoBlock.map((info, index) => (
                          <tr key={index}>
                            <th
                              className={`text-uppercase fw-normal ${
                                index == 0 ? "border-0" : ""
                              }`}
                            >
                              {info.name}
                            </th>
                            <td
                              className={`text-muted ${
                                index == 0 ? "border-0" : ""
                              }`}
                            >
                              {info.text}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                ))}
              </Row>
            </Tab.Pane> */}
            <Tab.Pane eventKey="third">
              <Row className="mb-5">
                <Col lg="10" xl="9">
                  {reviews.length == 0 ? <div className="text-muted h4"><i>No Reviews Found.</i></div> : reviews.map((review) => (
                    <div key={review.author} className="review d-flex">
                      <div className="flex-shrink-0 text-center me-4 me-xl-5">
                        <img
                          className="review-image"
                          src={review.avatar}
                          alt={review.author}
                        />
                        <span className="text-uppercase text-muted">
                          {review.date}
                        </span>
                      </div>
                      <div>
                        <h5 className="mt-2 mb-1">{review.author}</h5>
                        <div className="mb-2">
                          <Stars
                            stars={review.stars}
                            color="warning"
                            secondColor="gray-200"
                            starClass="fa-xs"
                          />
                        </div>
                        <p className="text-muted">{review.text}</p>
                      </div>
                    </div>
                  ))}

                  <ReviewForm />
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  )
}

export default DetailTabs
