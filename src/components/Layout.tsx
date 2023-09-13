import { NavLink, Outlet } from 'react-router-dom';
import { Container, Nav, NavItem, NavLink as NavLinkReactstrap } from 'reactstrap';

export const Layout = () => (
  <>
    <Nav>
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
    <hr />
    <Container>
      <Outlet />
    </Container>
  </>
);
