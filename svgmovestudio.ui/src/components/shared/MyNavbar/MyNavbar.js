import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    isOpen: false
  }

  toggle = () => {
    console.log('In toggle', this.state.isOpen);
    this.setState({ isOpen: !this.setState.isOpen });
    console.log('In toggle', this.state.isOpen);
  }


  render() {
    const { isOpen } = this.state;

    return(
      <div className="MyNavbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand className="nav-brand font-weight-bold" href="/">SVG Move Studio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto nav-center" navbar>
            <NavItem>
                <NavLink className="navbar-links px-4" tag={RRNavLink} to='/home'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-links px-4" tag={RRNavLink} to='/editor'>SVG Editor</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-links px-4" tag={RRNavLink} to='/documents'>Documents</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-links px-4" href="https://github.com/joeypetrone/SVGMoveStudio">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <NavLink className="btn-dark btn-sm" tag={RRNavLink} to='/sign-in'>Sign In</NavLink>
        </Navbar>
      </div>
    )
  }
}

export default MyNavbar;
