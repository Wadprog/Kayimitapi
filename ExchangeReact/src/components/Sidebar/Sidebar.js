import React, { useState } from 'react'
import { NavLink as NavLinkRRD } from 'react-router-dom'

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
} from 'reactstrap'

import { useDispatch } from 'react-redux'
import { logout } from 'store/auth'

const Sidebar = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const dispatch = useDispatch()
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      )
    })
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="sm"
    >
      <Container fluid>
        <NavbarToggler onClick={toggle} />

        <NavbarBrand className="pt-0">
          <h1 className="mt-3" onClick={toggle}>
            Kayimit<span className="text-muted text-center">Exchange</span>
          </h1>
        </NavbarBrand>

        <Collapse isOpen={isOpen} navbar>
          <NavbarToggler onClick={toggle} />
          <Nav navbar>{createLinks(routes)}</Nav>

          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="#" onClick={(e) => dispatch(logout())}>
                <i className="ni ni-spaceship" />
                Sign Out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Sidebar