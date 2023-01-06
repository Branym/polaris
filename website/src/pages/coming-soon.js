import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
  faVimeo,
} from "@fortawesome/free-brands-svg-icons"
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container } from "react-bootstrap"
import Image from "../components/CustomImage"

export async function getServerSideProps() {
  return {
    props: {
      hideHeader: true,
      hideFooter: true,
      noPaddingTop: true,
      title: "Coming Soon",
    },
  }
}

export default function ComingSoon() {
  return (
    <>
      <div className="mh-full-screen d-flex align-items-center dark-overlay">
        <Image
          className="bg-image"
          src="/img/photo/pete-bellis-189599-unsplash-big.jpg"
          alt=""
          layout="fill"
        />

        <Container className="text-white text-center text-lg overlay-content py-6 py-lg-0">
          <h1 className="text-hide">
            <span className="sr-only">Coming soon</span>{" "}
            <div className=" mx-auto mb-6">
              <Image
                className="bg-image"
                src="/img/coming-soon.png"
                alt=""
                width={489}
                height={279}
              />
            </div>
          </h1>

          <h3 className="mb-5 fw-normal">Sell. store is coming to you soon.</h3>
          <p className="mb-4">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="me-2" /> 25 Baker
            St., LB8 E18 London, UK
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                className="text-white"
                href="#"
                target="_blank"
                title="twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className="text-white"
                href="#"
                target="_blank"
                title="facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className="text-white"
                href="#"
                target="_blank"
                title="instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                className="text-white"
                href="#"
                target="_blank"
                title="pinterest"
              >
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="text-white" href="#" target="_blank" title="vimeo">
                <FontAwesomeIcon icon={faVimeo} />
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </>
  )
}
