import { Container, Row, Col } from "react-bootstrap"

import ShopHeader from "../../components/ShopHeader"
import ShopPagination from "../../components/ShopPagination"
import Product from "../../components/Product"
import Hero from "../../components/Hero"
import {useContext} from 'react'
import data from "../../data/category.json"
import {ShopContext} from '../../components/ShopContext'
import {fetchProducts} from '../../services/products'
import Link from "next/link"

export async function getServerSideProps(context) {

  const {channel} = context.params
  const {page = 1, category="", k="", collection=""} = context.query
  
  const products = await fetchProducts(channel, {page, category, name:k, tags: collection})

  if(products.data.length > 0){
    return {
      props: {
        products: products.data,
        total: products.total,
        channel: channel,
        category,
        k,
        collection,
        page,
        nav: {
          light: true,
        },
        title: "Explore Products",
      },
    }
  }
  else{
    return {
      notFound: true,
    }
  }
}

export default function CategoryNoSidebar({products,total, channel, category, page, k, collection}) {

  const {channels, categories} = useContext(ShopContext)

  console.log(products)

  return (
    <>
      <Hero
        title={collection === '' ? (k === '' ? (category === '' ? "All Products" : categories.filter(item => item.slug === category)[0]?.title) : k) : collection + " Collection"}
        breadcrumbs={[]}
        content={[]}
      />
      <Container>
        <Row>
          <Col xs="12" className="products-grid sidebar-none">
            {/* <ShopHeader channel={channel} categories={categories} category={categories.filter(item=> item.slug === category)[0] || "All Products"} page={page} name={k} total={total} /> */}
            <header className="product-grid-header justify-content-center mb-5">
              {/* <div className="me-3 mb-3">
                Showing <strong>1-12 </strong>of <strong>158 </strong>products
              </div> */}
             {collection !== '' && <div className="me-3 mb-3">
                {/* <span className="me-2">Show</span> */}
                <Link href={`/${channel}/explore?page=1`}>
                  <a className={"product-grid-header-show mx-3 h5" + (category === '' ? " active" : "")} href="#">
                    All{" "}
                  </a>
                </Link>
                {categories.filter(item => item.title !== "Addons").map(item => <Link href={`/${channel}/explore?page=1&category=${item.slug}`}>
                  <a className={"product-grid-header-show mx-3 h5" + (category === item.slug ? " active" : "")} href="#">
                    {item.title}{" "}
                  </a>
                </Link>)}
              
              </div>}
              {/* <div className="mb-3 d-flex align-items-center">
                <span className="d-inline-block me-1">Sort by</span>
                <select className="custom-select w-auto border-0">
                  <option value="orderby_0">Default</option>
                  <option value="orderby_1">Popularity</option>
                  <option value="orderby_2">Rating</option>
                  <option value="orderby_3">Newest first</option>
                </select>
              </div> */}
            </header>
            <Row>
              {products.map((value, index) => (
                <>
                  {value.category !== 'addons' && <Col key={index} sm="6" lg="4" xl="3">
                  <Product height={400} channel={channel} currency="INR" data={value} onlyViewButton />
                </Col>}
                </>
              ))}
            </Row>

            {/* <ShopPagination page={page} total={total} /> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}
