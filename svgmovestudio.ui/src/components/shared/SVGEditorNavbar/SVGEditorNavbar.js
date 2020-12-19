import React from 'react';
import { FormGroup, Input, Nav, NavLink, NavItem, Navbar, Row, Col, Button } from 'reactstrap';
import './SVGEditorNavbar.scss'

class SVGEditorNavbar extends React.Component {
  render() {
    return (
      <div className="SVGEditorNavbar pt-3 pb-2">
        <Row>
          <Col md={2} className="pr-3">
            <FormGroup className="m-0">
              <Input className="pb-2" type="select" name="select" id="exampleSelect">
                <option>Select Element</option>
                <option>Shape 1</option>
                <option>Shape 2</option>
                <option>Shape 3</option>
                <option>Shape 4</option>
                <option>Shape 5</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={7} className="pl-1">
            <Navbar className="border pl-1 py-0 pr-0 rounded" color="light" light expand="sm">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink className="pt-2 pb-1 text-dark">Position</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark">Scale</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark">Color</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark">Stretch</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
          <Col md={3} className="pl-0">
            <FormGroup className="m-0">
              <Input className="pb-2" type="select" name="select" id="exampleSelect" disabled>
                <option>Select SVG</option>
                <option>SVG 1</option>
                <option>SVG 2</option>
                <option>SVG 3</option>
                <option>SVG 4</option>
                <option>SVG 5</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SVGEditorNavbar;
