import React from "react";
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Col, Button } from 'reactstrap';
import './ColorEditor.scss'

class ColorEditor extends React.Component {
  static propTypes = {
    updateElementColor: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired 
  }

  state = {
    editorControl: {
      fill: '',
      opacity: 0
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        const selectedElementColor = {
          fill: selectedElement.fill,
          opacity: selectedElement.opacity
        }
  
        this.setState({editorControl: selectedElementColor})
      }
    }
  }

  colorElementClickEvent = (e) => {
    const { updateElementColor } = this.props;
    const { editorControl } = this.state;
    e.preventDefault();
    updateElementColor(editorControl.fill, editorControl.opacity);
  }

  fillChange = e => {
    const tempEditorControl = { ...this.state.editorControl };
    tempEditorControl.fill = e.target.value;
    this.setState({ editorControl: tempEditorControl })
  }

  opacityChange = e => {
    const tempEditorControl = { ...this.state.editorControl };
    tempEditorControl.opacity = e.target.value;
    this.setState({ editorControl: tempEditorControl })
  }

  render() {
    const { editorControl } = this.state;

    return (
      <div className="ColorEditor">
        Color
        <hr/>
        <Form>
          <FormGroup row>
            <Label for="fill-color" sm={5}>Fill Color</Label>
            <Col sm={7}>
              <InputGroup>
                <Input
                  type="color"
                  name="fill color"
                  id="fill-color"
                  value={editorControl.fill}
                  onChange={this.fillChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          <FormGroup row>
            <Label for="opacity" sm={5}>Opacity</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  className="mt-3"
                  type="range" 
                  name="opacity" 
                  id="opacity"
                  min="0"
                  max="10" 
                  value={editorControl.opacity}
                  onChange={this.opacityChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          <Button className="btn-dark mb-3 w-100" onClick={this.colorElementClickEvent}>Submit Change</Button>
        </Form>
      </div>
    )
  }
}

export default ColorEditor;
