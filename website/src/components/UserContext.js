import React, { useState, useRef, useEffect } from "react"
import { Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap"
import countries from "../data/countries.json"
import Icon from "./Icon"
import { login, getUserProfile } from "../services/initials"
import { useRouter } from "next/router"
import Link from "next/link"

const UserContext = React.createContext([{}, () => {}]);

const  UserProvider = (props) => {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    country_code: '',
    phone: '',
    company: ''
  });
  const [signUp, setSignUp] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const askToLogin = () => {
   setShow(true);
  }

  useEffect(async () => {
      const res = await getUserProfile();
      if(res?.type === "Success"){
        setError('');
        setShow(false);
        setLoggedIn(true)
        setUser(res.account)
      }
      setLoading(false)
  }, [])

  const router = useRouter()

  const handleAuth = async () => {
    console.log(profile)
    if(signUp){
      if(profile.first_name === '' || profile.last_name === '' ||
      profile.country_code === '' || profile.phone === ''
      ) return setError("Please fill the required fields.")
      else if(!/^.{1,20}$/.test(profile.first_name)) return setError("First Name must not exceed 20 letters")
      else if(!/^.{1,20}$/.test(profile.last_name)) return setError("Last Name must not exceed 20 letters")
      else if(!/^.{1,10}$/.test(profile.phone)) return setError("Phone must contain less then 10 numbers")
      else if(!/^.{1,50}$/.test(profile.company)) return setError("Company Name must not exceed 50 letters")
      else setError('')
    }
    
    const res = await login(email, password, signUp, profile);
    if(res.type === 'Success'){
        setError('');
        setShow(false);
        setLoggedIn(true)
        setUser(res.account)
    }
    else{
      setError(res.message)
    }
  }

  useEffect(() => {
    setShow(false)
  }, [router])

  const logout = async () => {
      localStorage.removeItem('token');
      setUser({});
      setLoggedIn(false);
      router.push('/' + router.query.channel)
  }

  return (
    <>
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
    >
      <button
        className="close modal-close"
        type="button"
        onClick={handleClose}
        aria-label="Close"
      >
        <Icon
          icon="close-1"
          className="w-100 h-100 svg-icon-light align-middle"
        />
      </button>

      <Modal.Body className="p-0">
      <Row className="justify-content-lg-center">
          <Col lg="6" style={{backgroundImage: `url('/images/features.jpg')`, backgroundSize: "cover", backgroundPosition: "center"}} className="bg-gray-100">

          </Col>
          <Col lg="6" className="py-7 px-lg-6"> 
            <div className="block p-lg-0 px-4 mb-4">
                <h3 className="text-uppercase mb-2">{!signUp ? "Login" : "Sign Up"}</h3>
                {signUp ? <p className="lead">Already our customer? <a onClick={() => setSignUp(false)} href="#">Log In</a></p> : <p className="lead">Not our customer yet? <a onClick={() => setSignUp(true)} href="#">Sign Up</a></p>}
            </div>
            <div className="block px-4 px-lg-0">
                  {signUp && <>
                    <Row>
                        <Col md="6" className="mb-4">
                          {/* <Form.Label htmlFor="first_name">First Name</Form.Label> */}
                          <Form.Control value={profile.first_name} onChange={(e) => setProfile({...profile, first_name: e.target.value})} placeholder="First Name" id="first_name" type="text" />
                        </Col>
                        <Col md="6" className="mb-4">
                          {/* <Form.Label htmlFor="last_name">Last Name</Form.Label> */}
                          <Form.Control value={profile.last_name} onChange={(e) => setProfile({...profile, last_name: e.target.value})} placeholder="Last Name" id="last_name" type="text" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="mb-4">
                          {/* <Form.Label htmlFor="country_code">Country Code</Form.Label> */}
                          <Form.Select id="country_code" value={profile.country_code} onChange={(e) => setProfile({...profile, country_code: e.target.value})} >
                                <option value="">Country</option>
                                {countries.map(item => <option value={item.phone}>{item.name} (+{item.phone})</option>)}
                          </Form.Select>
                        </Col>
                        <Col md={12} className="mb-4">
                          {/* <Form.Label htmlFor="phone">Phone</Form.Label> */}
                          <Form.Control value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="Phone" id="phone" type="text" />
                        </Col>
                    </Row>
                  <div className="mb-4">
                    {/* <Form.Label htmlFor="email">Email</Form.Label> */}
                    <Form.Control value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})} placeholder="Company (optional)" id="company" type="text" />
                  </div>
                  </>}
                  <div className="mb-4">
                    {/* <Form.Label htmlFor="email">Email</Form.Label> */}
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" type="text" />
                  </div>
                  <div className="mb-4">
                    {/* <Form.Label htmlFor="passwordRegister">Password</Form.Label> */}
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} id="passwordRegister" placeholder="Password" type="password" />
                  </div>
                 {error && <div className="text-danger my-3">
                      {error}
                  </div>}
                  <div className="mb-4 d-flex justify-content-between align-items-center">
                    <Button onClick={handleAuth} variant="outline-dark" type="submit">
                      {/* <FontAwesomeIcon className="me-2" /> */}
                      {!signUp ? "Login" : "Sign Up"}
                    </Button>
                    <div className="cursor-pointer">
                      <Link href={"/" + router?.query?.channel + "/reset-password"}><a>Forgot Password?</a></Link>
                    </div>
                  </div>
              </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
    <UserContext.Provider value={{loggedIn, user, guard: askToLogin, logout}}>
      {loading ? '' : props.children}
    </UserContext.Provider>
    </>
  )
}

export { UserContext, UserProvider };
