import Link from "next/link"

import { Breadcrumb } from "react-bootstrap"

const Breadcrumbs = (props) => {
  const links = props.links

  return (
    <Breadcrumb
      listProps={{
        className: props.className
          ? props.className
          : "justify-content-center no-border mb-0",
      }}
    >
      {links.map((item, index) =>
        item.link ? (
          <Link href={item.link} passHref key={index}>
            <Breadcrumb.Item
              active={item.active}
              linkProps={{
                className: props.linkClass ? props.linkClass : "",
              }}
            >
              {item.name}
            </Breadcrumb.Item>
          </Link>
        ) : (
          <Breadcrumb.Item
            active={item.active}
            className={props.spanClass ? props.spanClass : ""}
            key={index}
          >
            {item.name}
          </Breadcrumb.Item>
        )
      )}
    </Breadcrumb>
  )
}

export default Breadcrumbs
