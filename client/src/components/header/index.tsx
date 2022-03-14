import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NavIcon } from '../../svg/car-wash.svg';
import { AppState } from '../../store/reducer';
import { logout } from '../../pages/auth/store/actions';
import './index.scss';

const tokenState = createSelector(
  (state: AppState) => state.auth,
  auth => auth.token
);

function Header() {
  const token = useSelector(tokenState);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(prev => !prev);

  const signOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar tag="header" dark expand="md container shadow">
      <NavbarBrand
        className="nav-icon"
        tag={Link}
        to={token ? '/dashboard' : '/'}
      >
        <NavIcon />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="ms-auto" navbar>
          {!token && (
            <>
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
            </>
          )}
          {token && (
            <NavItem>
              <Button color="danger" onClick={signOut}>
                Sign out
              </Button>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
