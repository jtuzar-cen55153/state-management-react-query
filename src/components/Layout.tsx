import { FC, ReactElement } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button, Container, Nav, NavItem, NavLink as NavLinkReactstrap, Navbar, NavbarText } from 'reactstrap';
import { useAuth } from '../hooks/useAuth';
import { useLogoutUser } from '../hooks/useUser';

export const Layout: FC<{ children?: ReactElement }> = ({ children = null }) => {
  const { token } = useAuth();
  const logout = useLogoutUser();

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
            <Button onClick={logout}>Logout</Button>
          </NavbarText>
        )}
      </Navbar>
      <hr />
      <Container>{children ? children : <Outlet />}</Container>
    </>
  );
};
