import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
const Post = ({ data }) => {
  return (
    <>
      <div className="mb-4">
        <Link href="/blog/[slug]" as={`/blog/${data.slug}`}>
          <a>
            <img className="img-fluid" src={data.img} alt={data.title} />
          </a>
        </Link>
        <div className="mt-3">
          <small className="text-uppercase text-muted">{data.category}</small>
          <h5 className="my-2">
            <Link href="/blog/[slug]" as={`/blog/${data.slug}`}>
              <a className="text-dark">{data.title}</a>
            </Link>
          </h5>

          <p className="text-gray-500 text-sm my-3">
            <FontAwesomeIcon icon={faClock} className="me-2" />
            {data.date}
          </p>
          <p className="my-2 text-muted">{data.content}</p>

          <Link href="/blog/[slug]" as={`/blog/${data.slug}`} passHref>
            <Button variant="link" className="text-gray-700 ps-0">
              Read more
              <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-2" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Post
