import { Button, Card } from "react-bootstrap"

import Link from "next/link"
import Image from "./CustomImage"
const CardLookbook = ({ data, cardType = "big" }) => {
  let headingClass =
    cardType == "big" ? "display-3 fw-bold mb-4" : "display-4 mb-4"
  if (data.textColor) {
    headingClass += " " + data.textColor
  }

  return (
    <Card className="border-0 text-white text-center">
      <Image
        src={data.image}
        className="card-img"
        layout="responsive"
        width={600}
        height={400}
        alt={data.title}
        priority
      />
      <Card.ImgOverlay className="d-flex align-items-center">
        <div className="w-100 py-3">
          <h2 className={headingClass}>{data.title}</h2>

          <Link href="/category">
            {cardType === "big" ? (
              <Button variant="light">Shop now</Button>
            ) : (
              <Button
                variant="link"
                className={data.textColor ? data.textColor : "text-white"}
              >
                Shop now <i className="fa-arrow-right fa ms-2" />
              </Button>
            )}
          </Link>
        </div>
      </Card.ImgOverlay>
    </Card>
  )
}

export default CardLookbook
