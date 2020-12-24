import React from "react";
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, Col, Button } from 'reactstrap';
import './ColorEditor.scss'

class ColorEditor extends React.Component {
  static propTypes = {
    updateElementColor: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired 
  }

  state = {
    fillColor: '',
    fillOpacity: 0,
    strokeColor: '',
    strokeOpacity: 0
  }

  componentDidMount() {
    const { selectedElement } = this.props;

    if (selectedElement) {
      const fillColor = selectedElement.fill;
      const fillOpacity = selectedElement.fillOpacity * 10;
      const strokeColor = selectedElement.stroke;
      const strokeOpacity = selectedElement.strokeOpacity * 10;

      this.setState({fillColor, fillOpacity, strokeColor, strokeOpacity})
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        const fillColor = selectedElement.fill;
        const fillOpacity = selectedElement.fillOpacity * 10;
        const strokeColor = selectedElement.stroke;
        const strokeOpacity = selectedElement.strokeOpacity * 10;
  
        this.setState({fillColor, fillOpacity, strokeColor, strokeOpacity})
      }
    }
  }

  colorElementClickEvent = (e) => {
    const { updateElementColor } = this.props;
    const { fillColor, fillOpacity, strokeColor, strokeOpacity} = this.state;
    e.preventDefault();
    updateElementColor(fillColor, fillOpacity, strokeColor, strokeOpacity);
  }

  fillColorChange = e => {
    this.setState({ fillColor: e.target.value })
  }

  fillOpacityChange = e => {
    this.setState({ fillOpacity: e.target.value })
  }

  strokeColorChange = e => {
    this.setState({ strokeColor: e.target.value })
  }

  strokeOpacityChange = e => {
    this.setState({ strokeOpacity: e.target.value })
  }

  render() {
    const { 
      fillColor, 
      fillOpacity,
      strokeColor,
      strokeOpacity
     } = this.state;

     const { selectedElement } = this.props;

    return (
      <div className="ColorEditor">
        Color
        <hr/>
        <Form>
          {selectedElement.fill === null
          ? ''
          :
          <FormGroup row>
            <Label for="fill-color" sm={5}>Fill Color</Label>
            <Col sm={7}>
              <InputGroup>
                <Input
                  type="color"
                  name="fill color"
                  id="fill-color"
                  value={fillColor}
                  onChange={this.fillColorChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>          
          }
          {selectedElement.fill === null
          ? ''
          :
          <FormGroup row>
            <Label for="fill=opacity" sm={5}>Fill Opacity</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  className="mt-3"
                  type="range" 
                  name="fill opacity" 
                  id="fill-opacity"
                  min="0"
                  max="10" 
                  value={fillOpacity}
                  onChange={this.fillOpacityChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          }
          {selectedElement.stroke === null
          ? ''
          : 
          <FormGroup row>
            <Label for="stroke-color" sm={5}>Stroke Color</Label>
            <Col sm={7}>
              <InputGroup>
                <Input
                  className="mt-3"
                  type="color"
                  name="stroke color"
                  id="stroke-color"
                  value={strokeColor}
                  onChange={this.strokeColorChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          }
          {selectedElement.strokeOpacity === null
          ? ''
          :
          <FormGroup row>
            <Label for="stroke-opacity" sm={5}>Stroke Opacity</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  className="mt-4"
                  type="range" 
                  name="stroke opacity" 
                  id="stroke-opacity"
                  min="0"
                  max="10" 
                  value={strokeOpacity}
                  onChange={this.strokeOpacityChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          }
          <Button className="btn-dark mb-3 w-100" onClick={this.colorElementClickEvent}>Submit Change</Button>
        </Form>
      </div>
    )
  }
}

export default ColorEditor;
