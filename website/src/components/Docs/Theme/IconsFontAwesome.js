import React from "react"
import {
  faAddressBook,
  faAddressCard,
  faAdjust,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faAllergies,
  faAmbulance,
  faAmericanSignLanguageInterpreting,
  faAnchor,
  faAngleDoubleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArchive,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons"
import {
  faAddressBook as farAddressBook,
  faAddressCard as farAddressCard,
  faArrowAltCircleDown as farArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const IconsFontAwesome = () => {
  const icons = [
    faAddressBook,
    farAddressBook,
    faAddressCard,
    farAddressCard,
    faAdjust,
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faAllergies,
    faAmbulance,
    faAmericanSignLanguageInterpreting,
    faAnchor,
    faAngleDoubleDown,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleDoubleUp,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faArchive,
    faArrowAltCircleDown,
    farArrowAltCircleDown,
  ]
  return (
    <div id="icons-fontawesome" className="docs-item">
      <h5 className="text-uppercase mb-4">Icons - Font Awesome</h5>
      <div className="docs-desc">
        <p className="lead">
          Vector icons and social logos on your website with Font Awesome, the
          web’s most popular icon set and toolkit.
        </p>
        <p className="text-muted text-large">
          These icons are mostly used in buttons or for social network links.
          For a complete icon reference, see{" "}
          <a href="https://fontawesome.com/icons?d=gallery">here</a>.
        </p>
      </div>
      <div className="mt-5">
        <ul className="list-unstyled">
          {icons.map((icon, index) => (
            <li key={index} className="list-inline-item h5 me-3">
              <FontAwesomeIcon icon={icon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IconsFontAwesome
