import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { ReactComponent as NavIcon } from '../../svg/car-wash.svg';

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <Navbar tag="header" expand="md container shadow">
      <NavbarBrand className="nav-icon" tag={Link} to="/">
        <NavIcon />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/login">
              Sign In
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/register">
              Sign Up
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
