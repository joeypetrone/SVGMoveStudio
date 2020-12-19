import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Col, Button } from 'reactstrap';
import './PositionEditor.scss';

class PositionEditor extends React.Component {
  static propTypes = {
    createMoveElementObject: PropTypes.func.isRequired, 
  }

  state = {
    editorControl: {
      x_position: 0,
      y_position: 0
    }
  }

  moveElementClickEvent = (e) => {
    const { createMoveElementObject } = this.props;
    const { editorControl } = this.state;
    e.preventDefault();
    createMoveElementObject(editorControl.x_position, editorControl.y_position);
  }

  x_positionChange = e => {
    const tempEditorControl = { ...this.state.editorControl };
    tempEditorControl.x_position = e.target.value;
    this.setState({ editorControl: tempEditorControl })
  }

  y_positionChange = e => {
    const tempEditorControl = { ...this.state.editorControl };
    tempEditorControl.y_position = e.target.value;
    this.setState({ editorControl: tempEditorControl })
  }

  render() {
    const { editorControl } = this.state;

    return (
      <div className="PositionEditor">
        Position
        <hr/>
        <Form>
          <FormGroup row>
            <Label for="x_position" sm={5}>Horizontal</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  type="number" 
                  name="x_position" 
                  id="x_position" 
                  value={editorControl.x_position}
                  onChange={this.x_positionChange} 
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
          <FormGroup row>
            <Label for="y_position" sm={5}>Vertical</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  type="number" 
                  name="y_position" 
                  id="y_position" 
                  value={editorControl.y_position}
                  onChange={this.y_positionChange} 
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
          <Button className="btn-dark mb-3 w-100" onClick={this.moveElementClickEvent}>Submit Change</Button>
        </Form>
      </div>
    )
  }
}

export default PositionEditor;
