import { NavLink as Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './index.scss';

type Props = {
  role: 'admin' | 'customer';
};

function Sidebar({ role }: Props) {
  return (
    <div className="sidebar" data-testid="sidebar">
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink tag={Link} to="/dashboard">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/orders">
              Orders
            </NavLink>
          </NavItem>
          {role === 'customer' && (
            <NavItem>
              <NavLink tag={Link} to="/order">
                New Order
              </NavLink>
            </NavItem>
          )}
          {role === 'admin' && (
            <>
              <NavItem>
                <NavLink tag={Link} to="/activities">
                  Activities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/programs">
                  Programs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/program">
                  Create program
                </NavLink>
              </NavItem>
            </>
          )}
          <NavItem>
            <NavLink tag={Link} to="/profile">
              Profile
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
