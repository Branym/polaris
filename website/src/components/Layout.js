import Head from "next/head"
import NextNProgress from "../components/NextNProgress"

import Header from "./Header"
import Footer from "./Footer"
import { FormProvider } from "./FormContext"
import { useState, useEffect } from "react"
import SvgIcons from "./SvgIcons"
import SSRProvider from "react-bootstrap/SSRProvider"
import { ShopProvider } from "./ShopContext";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import {useRouter} from 'next/router';

const Layout = (pageProps) => {
  const [paddingTop, setPaddingTop] = useState(0)

 const router = useRouter()

  const headerProps = {
    nav: {
      classes: pageProps.nav && pageProps.nav.classes,
      fixed: pageProps.nav && pageProps.nav.fixed,
      color: pageProps.nav && pageProps.nav.color,
      light: pageProps.nav && pageProps.nav.light,
      dark: pageProps.nav && pageProps.nav.dark,
      sticky: pageProps.nav && pageProps.nav.sticky,
    },
    channel: router.query?.channel,
    loggedUser: pageProps.loggedUser,
    headerClasses: pageProps.headerClasses,
    headerAbsolute: pageProps.headerAbsolute,
    hideTopbar: pageProps.hideTopbar,
    setPaddingTop: (event) => setPaddingTop(event),
  }

  useEffect(() => {

  }, [])

  return (
    <SSRProvider>
      <div
        style={{ paddingTop: pageProps.noPaddingTop ? "0" : paddingTop }}
        className={pageProps.className}
      >
        <Head>
          <title>{pageProps.title} - Polaris Medfabrics</title>
        </Head>

        <NextNProgress color="#3494E6" options={{ showSpinner: false }} />
        <ShopProvider><UserProvider><CartProvider>
        {!pageProps.hideHeader && <Header {...headerProps} />}

       
          
          <FormProvider>
            <main className="overflow-x-hidden">{pageProps.children}</main>
          </FormProvider>
        
       

        {!pageProps.hideFooter && <Footer channel={headerProps.channel} />}
        <SvgIcons />
        </CartProvider>
        </UserProvider>
        </ShopProvider>
      </div>
    </SSRProvider>
  )
}

export default Layout
