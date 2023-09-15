import { NavLink, Outlet } from 'react-router-dom';
import { Container, Nav, NavItem, NavLink as NavLinkReactstrap, Navbar } from 'reactstrap';

export const Layout = () => (
  <>
    <Navbar expand="md">
      <Nav navbar>
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
      </Nav>
    </Navbar>
    <hr />
    <Container>
      <Outlet />
    </Container>
  </>
);
