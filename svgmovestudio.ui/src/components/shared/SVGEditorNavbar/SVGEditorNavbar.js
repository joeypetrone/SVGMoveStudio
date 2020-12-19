import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Nav, NavLink, NavItem, Navbar, Row, Col } from 'reactstrap';
import './SVGEditorNavbar.scss'

class SVGEditorNavbar extends React.Component {
  static propTypes = {
    openSelectedEditor: PropTypes.func.isRequired
  }

  editorSelectionClickEvent = (e) => {
    e.preventDefault();
    const { openSelectedEditor } = this.props;
    const editorName = e.target.id;
    openSelectedEditor(editorName);
  }

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
                  <NavLink className="pt-2 pb-1 text-dark" id="position" onClick={this.editorSelectionClickEvent}>Position</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark" id="scale" onClick={this.editorSelectionClickEvent}>Scale</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark" id="color" onClick={this.editorSelectionClickEvent}>Color</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark" id="stretch" onClick={this.editorSelectionClickEvent}>Stretch</NavLink>
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
