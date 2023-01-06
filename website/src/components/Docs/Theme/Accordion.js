import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { Collapse } from "react-bootstrap"

const Accordion = () => {
  const [collapse, setCollapse] = React.useState({
    1: true,
  })

  const toggleCollapse = (e, tab) => {
    e.preventDefault()
    setCollapse({ ...collapse, [tab]: !collapse[tab] })
  }
  return (
    <div id="accordion" className="docs-item element">
      <h5 className="text-uppercase mb-4">Accordion</h5>
      <div className="docs-desc">
        <p className="lead">
          Block components used to create an Accordion using Bootstrap' collapse
          plugin.
        </p>
      </div>
      <div className="mt-5">
        <div role="tablist">
          <div className="block mb-3">
            <div className="block-header" onClick={(e) => toggleCollapse(e, 1)}>
              <strong>
                <a
                  href="#"
                  className="accordion-link"
                  aria-expanded={collapse[1]}
                >
                  Option 1
                </a>
              </strong>
            </div>

            <Collapse in={collapse[1]}>
              <div>
                <div className="p-3">
                  <p className="text-muted mb-0">
                    The bedding was hardly able to cover it and seemed ready to
                    slide off any moment. His many legs, pitifully thin compared
                    with the size of the rest of him, waved about helplessly as
                    he looked. &quot;What's happened to me?&quot; he thought. It
                    wasn't a dream.
                  </p>
                </div>
              </div>
            </Collapse>
          </div>
          <div className="block mb-3">
            <div className="block-header" onClick={(e) => toggleCollapse(e, 2)}>
              <strong>
                <a
                  href="#"
                  className="accordion-link"
                  aria-expanded={collapse[2]}
                >
                  Option 2
                </a>
              </strong>
            </div>
            <Collapse in={collapse[2]}>
              <div>
                <div className="block-body py-5 d-flex align-items-center">
                  <input type="radio" name="shippping" id="payment-method-1" />
                  <label className="ms-3" for="payment-method-1">
                    <strong className="d-block text-uppercase mb-2">
                      {" "}
                      Pay with PayPal
                    </strong>
                    <span className="text-muted text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                    </span>
                  </label>
                </div>
              </div>
            </Collapse>
          </div>
          <div className="block mb-3">
            <div className="block-header" onClick={(e) => toggleCollapse(e, 3)}>
              <strong>
                <a
                  href="#"
                  className="accordion-link"
                  aria-expanded={collapse[3]}
                >
                  Option 3
                </a>
              </strong>
            </div>
            <Collapse in={collapse[3]}>
              <div>
                <div className="block-body py-5 d-flex align-items-center">
                  <input type="radio" name="shippping" id="payment-method-1" />
                  <label className="ms-3" for="payment-method-1">
                    <strong className="d-block text-uppercase mb-2">
                      {" "}
                      Pay on delivery
                    </strong>
                    <span className="text-muted text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                    </span>
                  </label>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {highlightCode}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default Accordion

const highlightCode = `import { Collapse } from 'react-bootstrap

const Component = () => {
    const [collapse, setCollapse] = React.useState({1: true})

    const toggleCollapse = (e,tab) => {
        e.preventDefault()
        setCollapse({...collapse,[tab]: !collapse[tab]})
    }
    return (
      <div role="tablist">
        <div className="block mb-3">
          <div className="block-header" onClick={(e) => toggleCollapse(e, 1)}>
            <strong>
              <a
                href="#"
                className="accordion-link"
                aria-expanded={collapse[1]}
              >
                Option 1
              </a>
            </strong>
          </div>

          <Collapse in={collapse[1]}>
            <div>
              <div className="p-3">
                <p className="text-muted mb-0">
                  The bedding was hardly able to cover it and seemed ready to
                  slide off any moment. His many legs, pitifully thin compared
                  with the size of the rest of him, waved about helplessly as
                  he looked. &quot;What's happened to me?&quot; he thought. It
                  wasn't a dream.
                </p>
              </div>
            </div>
          </Collapse>
        </div>
        <div className="block mb-3">
          <div className="block-header" onClick={(e) => toggleCollapse(e, 2)}>
            <strong>
              <a
                href="#"
                className="accordion-link"
                aria-expanded={collapse[2]}
              >
                Option 2
              </a>
            </strong>
          </div>
          <Collapse in={collapse[2]}>
            <div>
              <div className="block-body py-5 d-flex align-items-center">
                <input type="radio" name="shippping" id="payment-method-1" />
                <label className="ms-3" for="payment-method-1">
                  <strong className="d-block text-uppercase mb-2">
                    {" "}
                    Pay with PayPal
                  </strong>
                  <span className="text-muted text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                  </span>
                </label>
              </div>
            </div>
          </Collapse>
        </div>
        <div className="block mb-3">
          <div className="block-header" onClick={(e) => toggleCollapse(e, 3)}>
            <strong>
              <a
                href="#"
                className="accordion-link"
                aria-expanded={collapse[3]}
              >
                Option 3
              </a>
            </strong>
          </div>
          <Collapse in={collapse[3]}>
            <div>
              <div className="block-body py-5 d-flex align-items-center">
                <input type="radio" name="shippping" id="payment-method-1" />
                <label className="ms-3" for="payment-method-1">
                  <strong className="d-block text-uppercase mb-2">
                    {" "}
                    Pay on delivery
                  </strong>
                  <span className="text-muted text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
                  </span>
                </label>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    )
}

export default Component
`
