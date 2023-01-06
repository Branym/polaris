import { faSave } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Container, Row, Col, Form, Button, Badge, Alert } from "react-bootstrap"
import countries from '../../data/countries.json'
import CustomerSidebar from "../../components/CustomerSidebar"
import Hero from "../../components/Hero"
import { UserContext } from "../../components/UserContext"

import data from "../../data/customer-account.json"
import { editPassword, editUserProfile } from "../../services/initials"

export async function getServerSideProps() {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "Customer - Account",
      loggedUser: true,
    },
  }
}

export default function CustomerAccount() {

  const [error, setError] = useState(0);
  const [form, setForm] = useState(0);
  const [formErrors, setFormErrors] = useState({})
  const {user} = useContext(UserContext);
  const [profile, setProfile] = useState({company: '', ...user})

  const changePassword = async (event) => {

    event.preventDefault()
    const form = event.currentTarget;
    var object = {};
    for (let index = 0; index < form.elements.length; index++) {
      const element = form.elements[index];
      if(element.name){
        object[element.name] = element.value;
      }
    }

    if(object.newPassword === object.newPassword2){
        const res = await editPassword(object);
        if(res.type === "Success"){
          setForm(2)
          setError("Password Changed succesfully")
        }
        else{
          setForm(1)
          setError(res.meta.data.message)
        }
    }
    else{
        setForm(1)
        setError("Password must match.")
    }

  }

  const handleUpdate = async (event) => {
    setForm(0);
    setFormErrors({})
    event.preventDefault();
    
    const {meta, type} = await editUserProfile(profile);
    if(type === 'Error'){
      setForm(3)
      setError(meta.data.message)
      setFormErrors(meta.data.errors)
    }

  }

  return (
    <>
      <Hero
        title={data.subtitle}
        breadcrumbs={data.breadcrumbs}
        content={data.content}
      />

      <section>
        <Container>
          <Row>
            <Col lg="8" xl="9">
              <div className="block mb-5">
                <div className="block-header">
                  <strong className="text-uppercase">
                    Change your password
                  </strong>
                </div>
                <div className="block-body">
                  {(form < 3 && form > 0) && <Alert variant={form % 2 === 0 ? "success" : "danger"}>
                    {error}
                  </Alert>}
                  <Form onSubmit={changePassword}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="password_old"
                          >
                            Old password
                          </Form.Label>
                          <Form.Control name="oldPassword" id="password_old" type="password" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="password_1"
                          >
                            New password
                          </Form.Label>
                          <Form.Control name="newPassword" id="password_1" type="password" />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="password_2"
                          >
                            Retype new password
                          </Form.Label>
                          <Form.Control name="newPassword2" id="password_2" type="password" />
                        </div>
                      </Col>
                    </Row>
                    <div className="mt-4 text-center">
                      <Button variant="dark" type="submit">
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        Change password
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="block mb-5">
                <div className="block-header">
                  <strong className="text-uppercase">Personal details</strong>
                </div>
                <div className="block-body">
                  {(form < 6 && form > 2) && <Alert variant={form % 2 === 0 ? "success" : "danger"}>
                    {error}
                  </Alert>}
                  <Form onSubmit={handleUpdate}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label
                            className="form-label"
                            htmlFor="firstname"
                          >
                            Firstname
                          </Form.Label>
                          <Form.Control value={profile.first_name} onChange={(e) => setProfile({...profile, first_name: e.target.value})} id="firstname" type="text" />
                          {formErrors.first_name && <div className="text-danger py-2">
                                {formErrors.first_name.message}
                          </div>}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label className="form-label" htmlFor="lastname">
                            Lastname
                          </Form.Label>
                          <Form.Control value={profile.last_name} onChange={(e) => setProfile({...profile, last_name: e.target.value})} id="lastname" type="text" />
                          {formErrors.last_name && <div className="text-danger py-2">
                                {formErrors.last_name.message}
                          </div>}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label className="form-label" htmlFor="company">
                            Company
                          </Form.Label>
                          <Form.Control value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})} id="company" type="text" />
                          {formErrors.company && <div className="text-danger py-2">
                                {formErrors.company.message}
                          </div>}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label className="form-label" htmlFor="email">
                            Email
                          </Form.Label>
                          <Form.Control disabled={true} defaultValue={profile.email} id="email" type="text" />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="6">
                        <div className="mb-4">
                        <Form.Label className="form-label" htmlFor="country_code">
                            Country
                        </Form.Label>
                        <Form.Select id="country_code" value={profile.country_code} onChange={(e) => setProfile({...profile, country_code: e.target.value})} >
                                <option value="">Country</option>
                                {countries.map(item => <option key={item.code} value={item.phone}>{item.name} (+{item.phone})</option>)}
                          </Form.Select>
                          {formErrors.country_code && <div className="text-danger py-2">
                                {formErrors.country_code.message}
                          </div>}
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-4">
                          <Form.Label className="form-label" htmlFor="phone">
                            Phone
                          </Form.Label>
                          <Form.Control value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} id="phone" type="text" />
                          {formErrors.phone && <div className="text-danger py-2">
                                {formErrors.phone.message}
                          </div>}
                        </div>
                      </Col>
                 
                    </Row>
                    <div className="text-center mt-4">
                      <Button variant="outline-dark" type="submit">
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        Save changes
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>

            <CustomerSidebar />
          </Row>
        </Container>
      </section>
    </>
  )
}
