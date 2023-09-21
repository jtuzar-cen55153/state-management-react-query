import { FC, ReactElement } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, NavItem, NavLink as NavLinkReactstrap, Navbar, NavbarText } from 'reactstrap';
import { useAuth } from '../hooks/useAuth';

export const Layout: FC<{ children?: ReactElement }> = ({ children = null }) => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="md">
        <Nav navbar>
          {token && (
            <>
              <NavItem>
                <NavLinkReactstrap to="/" tag={NavLink}>
                  Dashboard
                </NavLinkReactstrap>
              </NavItem>
              <NavItem>
                <NavLinkReactstrap to="/heroes" tag={NavLink}>
                  Heroes
                </NavLinkReactstrap>
              </NavItem>
            </>
          )}
          {!token && (
            <>
              <NavItem>
                <NavLinkReactstrap to="/login" tag={NavLink}>
                  Login
                </NavLinkReactstrap>
              </NavItem>
              <NavItem>
                <NavLinkReactstrap to="/register" tag={NavLink}>
                  Register
                </NavLinkReactstrap>
              </NavItem>
            </>
          )}
        </Nav>
        {token && (
          <NavbarText>
            <Button onClick={handleClick}>Logout</Button>
          </NavbarText>
        )}
      </Navbar>
      <hr />
      <Container>{children ? children : <Outlet />}</Container>
    </>
  );
};
