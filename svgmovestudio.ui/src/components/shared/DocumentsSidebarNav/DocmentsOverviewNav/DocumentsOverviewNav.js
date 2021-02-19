import React from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

import './DocumentsOverviewNav.scss';

class DocumentsOverviewNav extends React.Component {
  render() {
    return(
      <div className="DocumentsOverviewNav">
        <Nav className="overview-nav" vertical>
          <NavItem>
            <NavLink disabled href="#">About SVG</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Getting Started</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Tutorials</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}

export default DocumentsOverviewNav;
