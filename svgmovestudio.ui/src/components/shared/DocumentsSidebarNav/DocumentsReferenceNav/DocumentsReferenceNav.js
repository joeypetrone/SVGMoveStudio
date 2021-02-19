import React from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

import './DocumentsReferenceNav.scss';

class DocumentsReferenceNav extends React.Component {
  render() {
    return(
      <div className="DocumentsReferenceNav">
        <Nav className="reference-nav" vertical>
          <NavItem>
            <NavLink disabled href="#">Tools</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Viewbox</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Toolbox</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}

export default DocumentsReferenceNav;
