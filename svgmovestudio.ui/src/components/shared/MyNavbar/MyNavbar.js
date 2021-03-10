import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './MyNavbar.scss';
import authData from '../../../helpers/data/authData';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired
  }

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.setState.isOpen });
  }

  signOutEvent = (e) => {
    e.preventDefault();
    authData.signOutUser();
  }

  render() {
    const { isOpen } = this.state;
    const { authed } = this.props;

    return(
      <div className="MyNavbar">
        <Navbar color="white" light expand="md">
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
                <NavLink className="navbar-links px-4" href="https://github.com/joeypetrone/SVGMoveStudio" target="_blank">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          { authed === true
          ? <NavLink className="btn-dark btn-sm auth-button" onClick={this.signOutEvent}>Sign Out</NavLink>
          : <NavLink className="btn-dark btn-sm auth-button" tag={RRNavLink} to='/sign-in'>Sign In</NavLink>
          }
        </Navbar>
      </div>
    )
  }
}

export default MyNavbar;
