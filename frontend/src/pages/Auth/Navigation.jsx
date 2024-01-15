import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/auth/authSlice";
import logo from "../../assets/logo.png";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

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
            {userInfo ? (
              <NavDropdown title={userInfo.username} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Login
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/movielist">
                  <NavDropdown.Item>Movies</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/genrelist">
                  <NavDropdown.Item>Genre</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/medialist">
                  <NavDropdown.Item>Media Types</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {/* <LinkContainer to="/login">
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
