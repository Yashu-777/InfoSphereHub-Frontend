import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function NavBar() {
  const navigate = useNavigate();
  const {logoutSuccess} = useAuth();
  const username=localStorage.getItem('username');
  const handleBrandClick = (e) => {
    e.preventDefault();
    console.log("brand clicked");
    navigate('/');
  };

  const handleLogout = () => {
    console.log("log out success");
    logoutSuccess();
    navigate('/');
    
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand onClick={handleBrandClick}>Big Three</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {username ? (
            <Nav>
              <Nav.Link>Hello {username}</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
