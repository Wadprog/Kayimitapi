import { Link } from 'react-router-dom'
// reactstrap components
import { NavbarBrand, Navbar, Container } from 'reactstrap'

const AuthNavBar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <h4>
              Kayimit<span className="text-muted">Exchange</span>
            </h4>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
        </Container>
      </Navbar>
    </>
  )
}

export default AuthNavBar
