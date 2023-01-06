import { Container, Row, Col, Form, Button } from "react-bootstrap"


import Hero from "../../components/Hero"

import data from "../../data/customer-login.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { forgotPassword } from "../../services/initials"


export async function getServerSideProps() {
  return {
    props: {
      hideHeader: true,
      hideFooter: true,
      noPaddingTop: true,
      title: "Reset Password",
    },
  }
}

export default function CustomerLogin() {

  const router = useRouter();
  const [payload, setPayload] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {

    if(router.query?.token) setPayload({
      password: '',
      password_new: ''
    })
    else{
      setPayload({
        email: ''
      })
    }

  }, [])

  const sendEmail = (email) => {
    setLoading(true)
    forgotPassword({email: email}, 'forgot').then(res => {
      if(res.type === "Error"){
        setSuccess('')
        setError(res.message)
      }
      else{
        setSuccess(res.message)
        setError('')
      }
      setLoading(false)
    })
  }

  const changePassword = (payload) => {

    if(payload.password == '' || payload.password_new === ''){
      setError('Password is required.')
      return 
    }

    if(payload.password !== payload.password_new){
      setError('Password did not match.')
      return 
    }

    forgotPassword({token: router.query?.token, password: payload.password}, 'reset').then(res => {
      if(res.type === "Error"){
        setSuccess('')
        setError(res.message)
      }
      else{
        setSuccess(res.message + ' Redirecting...')
        setTimeout(() => {
          router.push('/')
        }, 3000)
        setError('')
      }
    })

  }

  return (
    <>
     <div className="py-7">
     <Hero
        title={"Reset Password"}
        content={data.content}
      />
     </div>

      <Container>
        <Row className="justify-content-center">
          {!router.query?.token ? <Col lg="5">
            <div className="block">
              <div className="block-header">
                <h6 className="text-uppercase mb-0">Forgot Password</h6>
              </div>
              <div className="block-body">
                <p className="text-muted">
                 Enter your email address. We will send you a link on your email from which you can reset your password easily.
                </p>
                  <div className="mb-4">
                    <Form.Label htmlFor="email_1">Email</Form.Label>
                    <Form.Control value={payload.email} onChange={(e) => setPayload({...payload, email: e.target.value})} id="email_1" type="text" />
                  </div>
                  {error !== '' && <div className="pb-3 text-danger">
                      {error}
                  </div>}
                  {success !== '' && <div className="p-3 my-3 bg-green text-white">
                      {success}
                  </div>}
                  <div className="mb-4">
                    <Button variant="outline-dark" onClick={() => sendEmail(payload.email)} type="submit">
                      {loading ? "Sending..." : <>
                        <FontAwesomeIcon icon={faSignInAlt} className="me-2" />{" "}
                        Reset Password
                      </>}
                    </Button>
                  </div>
              </div>
            </div>
          </Col> :
          <Col lg="5">
            <div className="block">
              <div className="block-header">
                <h6 className="text-uppercase mb-0">New Password</h6>
              </div>
              <div className="block-body">
                <p className="text-muted">
                  Please choose a new password for your account.
                </p>
                    <div className="mb-4">
                      <Form.Label htmlFor="passwordRegister">Password</Form.Label>
                      <Form.Control value={payload.password} onChange={(e) => setPayload({...payload, password: e.target.value})} id="passwordRegister" type="password" />
                    </div>
                    <div className="mb-4">
                      <Form.Label htmlFor="passwordRegister">Confirm Password</Form.Label>
                      <Form.Control value={payload.password_new} onChange={(e) => setPayload({...payload, password_new: e.target.value})} id="passwordRegister" type="password" />
                    </div>
                    {error !== '' && <div className="pb-3 text-danger">
                      {error}
                  </div>}
                  {success !== '' && <div className="p-3 my-3 bg-green text-white">
                      {success}
                  </div>}
                  <div className="mb-4">
                 {success === '' &&  <Button variant="outline-dark" onClick={() => changePassword(payload)} type="submit">
                      {loading ? "Sending..." : <>
                        <FontAwesomeIcon icon={faSignInAlt} className="me-2" />{" "}
                        Change Password
                      </>}
                    </Button>}
                  </div>
              </div>
            </div>
          </Col>}
        </Row>
      </Container>
    </>
  )
}
