import api from "../api";
import Nav from "react-bootstrap/Nav";
import useAuth from "../hooks/useAuth";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useAuth();
  const userName = user?.name || null;

  const handleLogout = async () => {
    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      navigate("/login", {
        state: { toastMessage: "Berhasil keluar" },
      });
    }
  };

  const isActive = (path, exact = true) => {
    if (exact) {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={isActive("/")}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/product"
              active={isActive("/product", false)}
            >
              Product
            </Nav.Link>
          </Nav>
          {userName && (
            <Nav className="ms-auto">
              <NavDropdown title={userName} id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to="/cart"
                  active={isActive("/cart")}
                >
                  Cart
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/order"
                  active={isActive("/order", false)}
                >
                  Order
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {!userName && (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
