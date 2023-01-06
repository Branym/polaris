import { Container, Row, Col, Button } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
import React from "react"
import Link from "next/link"
import Image from "./CustomImage"
export default function HeroMain({ data, marqueeData, ...props }) {
  return data.length ? (
    <section className={props.sectionClass ? props.sectionClass : ""}>
      <Carousel>
        {data.map(data => {
          return <Carousel.Item>
            <Image
              src={data?.img}
              className="bg-image "
              layout="fill"
              alt="..."
              loading={props.eager && index === 0 ? "eager" : "lazy"}
            />
            <div
              className={`${!props.columns ? "px-lg-6" : ""} ${props.containerclass ? props.containerclass : ""
                } h-100`}
              style={{ zIndex: 100, ...data.containerStyle }}
            >
              <Row
                className={`overlay-content align-items-center ${data.rowclass ? data.rowclass : ""
                  }`}
              >
                <Col
                  lg={{
                    span: 7,
                    offset: data.contentoffset,
                  }}
                  className={data.contentclass ? data.contentclass : ""}
                >
                  {data.subtitle && (
                    <h5
                      className={`h-100 subtitle letter-spacing-5 ${data.subtitleclass ? data.subtitleclass : ""
                        }`}
                    >
                      {data.subtitle}
                    </h5>
                  )}
                  <h2
                    className={data.titleclass ? data.titleclass : ""}
                    style={{ lineHeight: "1" }}
                  >
                    {data.name}
                  </h2>
                  {data.text && (
                    <p
                      className={`lead mb-5`}
                      dangerouslySetInnerHTML={{ __html: data.text }}
                    />
                  )}
                  <Link href={'/' + props.channel + '/' + data.link} passHref>
                    <a className="btn btn-outline-light">
                      {data.button}
                    </a>
                  </Link>
                </Col>
              </Row>
            </div>
            {data.upperImage && <img
              src={data?.upperImage}
              className="upper-image"
              alt="..."
            />}
          </Carousel.Item>
        })}

      </Carousel>
      <div className="marqueeSectionWrapper">
        <div className="marqueeSection">{
          marqueeData.map(item => {
            return <p class="text">
              <span class="check">
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">    <path d="M8.01862 15.8563C7.71671 16.2661 7.24655 16.5179 6.7382 16.543C6.22986 16.5683 5.73751 16.3634 5.39689 15.9851L2.34447 12.5977C1.85935 12.0597 1.90244 11.2303 2.44047 10.7452C2.97901 10.2601 3.80785 10.3034 4.29297 10.8417L6.45255 13.2385C6.48455 13.2741 6.53099 13.2932 6.57873 13.2908C6.62673 13.2885 6.6706 13.2645 6.69924 13.2263L12.8212 5.03342C13.2508 4.45024 14.0719 4.32612 14.6553 4.75602C15.2383 5.18592 15.3621 6.00702 14.9322 6.58995L8.01862 15.8563Z" fill="white"></path>
                </svg>
              </span>
              {item}
            </p>
          })
        }
        </div>
      </div>
    </section>
  ) : (
    "loading"
  )
}
