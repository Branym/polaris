import { faDollarSign } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Container, Row, Col, Dropdown } from "react-bootstrap"
import Icon from "../Icon"
import Link from "next/link"
import {ShopContext} from '../ShopContext';

import { formatPrice } from "../../services/formatPrice"
import { useRouter } from "next/router"
export default function TopBar({ innerRef,channel, hideTopbar }) {
  const router = useRouter()
  const {channels} = React.useContext(ShopContext)
  return (
    <div ref={innerRef}>
      {!hideTopbar && (
        <div className="top-bar d-none d-lg-block">
          <Container fluid={true}>
            <Row className="d-flex align-items-center">
              <Col sm="4" className="d-none d-sm-block">
                <ul className="list-inline mb-0 topbar-text">
                  <li className="list-inline-item pe-3 me-0">
                    <a href="tel:+918306998921" className="text-muted">
                      <Icon icon="calls-1" className="me-2" />
                      +91 830 699 8921
                    </a>
                  </li>
                  <li className="list-inline-item px-3 border-start d-none d-lg-inline-block"></li>
                </ul>
              </Col>
              <Col sm="4" className="d-lg-flex d-none  justify-content-center">
                <ul className="list-inline mb-0 topbar-text">
                  <li className="list-inline-item pe-3 me-0">
                    <Link
                      href={`/${channel}/contact`}
                      className="text-muted"
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <a className="text-dark mx-2">Contact Us</a>
                    </Link>
                    |
                    <Link
                      href={`/${channel}/faq`}
                      className="text-muted"
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <a className="text-dark mx-2">FAQs</a>
                    </Link>
                    |
                    <Link
                      href={`/${channel}/page/?slug=bulk-order`}
                      className="text-muted"
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                     <a className="text-dark mx-2">Bulk Orders</a>
                    </Link>
                  </li>
                  <li className="list-inline-item px-3 border-start d-none d-lg-inline-block"></li>
                </ul>
              </Col>
              <Col sm="4" className="d-flex justify-content-end">
                {/* Language Dropdown*/}

                {/* <Dropdown className="border-end px-3">
                  <Dropdown.Toggle
                    as="a"
                    href="#"
                    className="topbar-link"
                    id="langsDropdown"
                  >
                    <img
                      className="topbar-flag"
                      src="/svg/united-kingdom.svg"
                      alt="english"
                    />
                    English
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    align="end"
                    aria-labelledby="langsDropdown"
                    className="dropdown-menu-animated"
                  >
                    <Dropdown.Item className="text-sm">
                      <img
                        className="topbar-flag"
                        src="/svg/germany.svg"
                        alt="german"
                      />
                      German
                    </Dropdown.Item>
                    <Dropdown.Item className="text-sm">
                      <img
                        className="topbar-flag"
                        src="/svg/france.svg"
                        alt="french"
                      />
                      French
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}

                {/* Currency Dropdown*/}
                <Dropdown className="ps-3 ms-0">
                  <Dropdown.Toggle
                    as="a"
                    href="#"
                    className="topbar-link"
                    id="currencyDropdown"
                  >
                    {channels?.filter(item => item.slug === channel)[0]?.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    align="end"
                    aria-labelledby="currencyDropdown"
                    className="dropdown-menu-animated"
                  >
                    {channels.map(item => <Dropdown.Item key={item.slug} onClick={(e) => {router.push('/'+ item.slug)}} className="text-sm">{item.name}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  )
}
