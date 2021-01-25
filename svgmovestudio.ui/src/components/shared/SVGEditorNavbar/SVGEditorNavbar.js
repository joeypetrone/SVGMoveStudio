import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Nav, NavLink, NavItem, Navbar, Row, Col } from 'reactstrap';
import './SVGEditorNavbar.scss'

class SVGEditorNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    openSelectedEditor: PropTypes.func.isRequired,
    viewboxElements: PropTypes.array.isRequired,
    setSelectedElement: PropTypes.func.isRequired
  }

  state = {
    SVGDropdownMenuIsDisabled: true
  }

  componentDidMount() {
    this.disableSVGDropdownMenuToggle()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authed !== this.props.authed) {
      this.disableSVGDropdownMenuToggle()
    }
  }

  disableSVGDropdownMenuToggle = () => {
    const { authed } = this.props;

    if (authed) {
      this.setState({SVGDropdownMenuIsDisabled: false});
    } else {
      this.setState({SVGDropdownMenuIsDisabled: true});
    }
  }



  editorSelectionClickEvent = (e) => {
    e.preventDefault();
    const { openSelectedEditor } = this.props;
    const editorName = e.target.id;
    openSelectedEditor(editorName);
  }

  elementChange = (e) => {
    const { viewboxElements, setSelectedElement } = this.props;
    const selectedElementTempId = e.target.value;
    const selectedElement =  viewboxElements.find(element => element.tempId === parseInt(selectedElementTempId))

    if (selectedElementTempId === 'default') {
      setSelectedElement({});
    } else {
      setSelectedElement(selectedElement)
    }
  }

  render() { 
    const { SVGDropdownMenuIsDisabled } = this.state;
    const { viewboxElements } = this.props;
    
    const buildElementOptions = viewboxElements.map((element) => {
      return <option key={element.tempId} value={element.tempId}>{element.elementName}</option>
    })
    
    return (
      <div className="SVGEditorNavbar pt-3 pb-2">
        <Row>
          <Col md={2} className="pr-3">
            <FormGroup className="m-0">
              <Input className="pb-2" type="select" name="select" id="exampleSelect" onChange={this.elementChange} >
                <option value="default">Select Element</option>
                {buildElementOptions}
              </Input>
            </FormGroup>
          </Col>
          <Col md={7} className="pl-1">
            <Navbar className="border pl-1 py-0 pr-0 rounded" color="light" light expand="sm">
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink className="pt-2 pb-1 text-dark pointer" id="position" onClick={this.editorSelectionClickEvent}>Position</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark pointer" id="scale" onClick={this.editorSelectionClickEvent}>Scale</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark pointer" id="color" onClick={this.editorSelectionClickEvent}>Color</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark pointer" id="stretch" onClick={this.editorSelectionClickEvent}>Stretch</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="pt-2 pb-1 text-dark pointer" id="delete" onClick={this.editorSelectionClickEvent}>Delete</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
          <Col md={3} className="pl-0">
            <FormGroup className="m-0">
              <Input className="pb-2" type="select" name="select" id="exampleSelect" disabled={SVGDropdownMenuIsDisabled}>
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
