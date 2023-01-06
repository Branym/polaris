import { Container, Row, Col } from "react-bootstrap"
import Editor from "../../components/Editor"

import Hero from "../../components/Hero"

import data from "../../data/text.json"
import { viewSinglePage } from "../../services/pages"

export async function getServerSideProps(context) {

  const {slug} = context.query
  const page = await viewSinglePage(slug)
  if(page?.error === true){
    return {
      notFound: true
    }
  }

  return {
    props: {
      page,
      nav: {
        light: true,
        classes: "navbar-sticky bg-fixed-white",
        color: "white",
      },
      title: page.title,
    },
  }
}

export default function Text({page, title}) {

  return (
    <>
      <Hero title={page.title} breadcrumbs={[{
            "name": "Home",
            "link": "/"
        },
        {
            "name": page.title,
            "active": true
        }
    ]} />

      <section className="pb-5">
        <Container>
          <Row>
            <Col xl="8" lg="10" className="mx-auto">
                <Editor value={page.description}></Editor>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
