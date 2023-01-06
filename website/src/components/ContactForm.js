import { useRouter } from "next/router"
import { useState } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { sendMail } from "../services/orders"

const ContactForm = (props) => {

  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const router = useRouter()

  return (
    <Form {...props}>
      <div className="controls">
        <div className="mb-4">
          <Form.Label htmlFor="name">Your name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => {
                setData({...data, name: e.target.value})
            }}
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <Form.Label htmlFor="email">Your email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={(e) => {
                setData({...data, email: e.target.value})
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <Form.Label htmlFor="message">Your message for us *</Form.Label>
          <div>
          <textarea
            type="textarea"
            value={data.message}
            onChange={(e) => {
                setData({...data, message: e.target.value})
            }}
            rows="4"
            className="w-100 p-3 form-control"
            name="message"
            id="message"
            placeholder="Enter your message"
            required
          />
          </div>
        </div>
        <Button onClick={() => {

            if(data.name === '' || data.email === '' || data.message === ''){
              // alert("Please fill the required field.")
              return
            }


            sendMail({
              subject: "Contact Enquiry",
              content: [
                {
                  "type": "text/html",
                  "value": JSON.stringify(data)
                }
              ]
            })
            setData({
              name: '',
              email: '',
              message: ''
            })
            router.push('/' + router.query.channel + '/response')

        }} type="submit" variant="outline-dark">
          Send message
        </Button>
      </div>
    </Form>
  )
}

export default ContactForm
