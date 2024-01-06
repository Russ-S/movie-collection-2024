import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo.png";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="Movie Collection" />
            Movie Collection
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basoc=navbar-nav">
          <Nav className="ms-auto pe-5">
            <LinkContainer to="/login">
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
