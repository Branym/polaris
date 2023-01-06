import React from "react"

import { Row, Col, Dropdown, Badge } from "react-bootstrap"
import ActiveLink from "../ActiveLink"
import Icon from "../Icon"
export default function MegaMenu({ item, channel, onLinkClick }) {
  return (
    <Row>
      <Col lg="9">
        <Row className="p-3 pe-lg-0 ps-lg-5 pt-lg-5 ">
          {item.megamenu.map((megamenuItem, index) => (
            <Col key={index} lg="3">
              {megamenuItem.map((block, index) => (
                <React.Fragment key={index}>
                  <h6 className="text-uppercase">{block.title}</h6>
                  <ul className="megamenu-list list-unstyled">
                    {block.links.map((link, index) => (
                      <li key={index} className="megamenu-list-item">
                        <ActiveLink
                          activeClassName="active"
                          href={'/[channel]' + link.link}
                          as={'/' + channel + link.as}
                          passHref
                        >
                          <Dropdown.Item
                            className="megamenu-list-link"
                            onClick={() =>
                              link.parent
                                ? onLinkClick(link.parent)
                                : onLinkClick(item.title)
                            }
                          >
                            {link.title}
                            {link.new && (
                              <Badge bg="warning" className="ms-1 mt-n1">
                                New
                              </Badge>
                            )}
                          </Dropdown.Item>
                        </ActiveLink>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </Col>
          ))}
        </Row>
        <div className="py-0 py-lg-4">
              {/* Adding Extra Space */}
        </div>
        {item.services && (
          <Row className="megamenu-services d-none d-lg-flex ps-lg-5">
            {item.services.map((service) => (
              <Col key={service.title} xl="3" lg="6" className="d-flex">
                <div className="megamenu-services-item">
                  <Icon
                    className="megamenu-services-icon"
                    icon={service.icon}
                  />

                  <div>
                    <h6 className="text-uppercase">{service.title}</h6>
                    <p className="mb-0 text-muted text-sm">{service.content}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Col>
      {item.image && (
        <Col lg="3" className="d-none d-lg-block position-relative">
          <img src={item.image} alt="" className="bg-image" />
        </Col>
      )}
    </Row>
  )
}
