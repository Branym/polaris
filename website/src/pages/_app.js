import Layout from "../components/Layout"
import "swiper/css/bundle"
import "../../public/fonts/hkgrotesk/stylesheet.css"
import "react-image-lightbox/style.css"
import "../scss/style.default.scss"
import { Button } from "react-bootstrap"
import { useState } from "react"
import Script from 'next/script'


export async function getServerSideProps(context) {
  return {
    props: { message: `Next.js is awesome`, query: context.query, params: context.params }, // will be passed to the page component as props
  }
}

const App = ({ Component, pageProps }) => {
  
  const [beta, setBeta] = useState(false)
  
  return (
    <>
      {beta && <div className="position-fixed bottom-0 w-100 bg-red text-white" style={{zIndex: 1000}}>
          <div className="container">
              <div className="d-flex px-4 py-5 flex-lg-row flex-column w-100 justify-content-between align-items-lg-center">
                  <div className="mb-3 mb-lg-0">
                    <h3>Welcome to Polaris Medifabrics Beta</h3>
                    <h5 style={{maxWidth: "600px", fontWeight: 400}}>We are going live soon. To improve your customer experience we are testing all our functionalities. You can explore all our products with placing order.</h5>
                  </div>
                  <div>
                    <a type="button" onClick={() => {setBeta(false)}} className="btn btn-outline-light">
                      Hide
                    </a>
                  </div>
              </div>
          </div>
      </div>}
      <Layout {...pageProps}>
        <Script type="text/javascript" id="zsiqchat"  src="/livechat.js" />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

// This default export is required in a new `pages/_app.js` file.
export default App
