import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Col } from 'reactstrap';
import './PositionEditor.scss';

class PositionEditor extends React.Component {
  static propTypes = {
    updateElementPosition: PropTypes.func.isRequired,
    updateElementRotation: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired
  }

  state = {
    x_position: 0,
    y_position: 0,
    rotation: 0
  }

  componentDidMount() {
    const { selectedElement } = this.props;

    if (selectedElement) {
      if(Object.entries(selectedElement).length === 0) {
        this.setState({x_position: 0, y_position: 0, rotation: 0})
      } else {
        const x_position = selectedElement.x_Translate;
        const y_position = selectedElement.y_Translate;
        const rotation = selectedElement.rotate;
        this.setState({x_position, y_position, rotation})
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        if(Object.entries(selectedElement).length === 0) {
          this.setState({x_position: 0, y_position: 0, rotate: 0})
        } else {
          const x_position = selectedElement.x_Translate;
          const y_position = selectedElement.y_Translate;
          const rotation = selectedElement.rotate;
          this.setState({x_position, y_position, rotation})
        }
      }
    }
  }

  x_positionChange = e => {
    const { updateElementPosition } = this.props;
    const x_position = parseInt(e.target.value);
    this.setState({ x_position })
    updateElementPosition(x_position, null);
  }

  y_positionChange = e => {
    const { updateElementPosition } = this.props;
    const y_position = parseInt(e.target.value);
    this.setState({ y_position })
    updateElementPosition(null, y_position);
  }

  rotationChange = e => {
    const { updateElementRotation } = this.props;
    const rotation = parseInt(e.target.value);
    this.setState({ rotation })
    updateElementRotation(rotation);
  }

  render() {
    const { selectedElement } = this.props;
    const { x_position, y_position, rotation } = this.state;

    const disable = () => {
      if (Object.entries(selectedElement).length === 0) {
        return true;
      } else {
        return false;
      }
    }

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
                  name="horizontal position" 
                  id="x_position" 
                  value={x_position}
                  onChange={this.x_positionChange}
                  disabled={disable()}
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
                  name="vertical position" 
                  id="y_position" 
                  value={y_position}
                  onChange={this.y_positionChange} 
                  disabled={disable()}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
          <FormGroup row>
            <Label for="rotation" sm={5}>Rotate</Label>
            <Col sm={7}>
              <InputGroup>
              <Input 
                  type="number" 
                  name="rotation" 
                  id="rotation"
                  min="0"
                  max="360" 
                  value={rotation}
                  onChange={this.rotationChange}
                  disabled={disable()}  
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>deg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default PositionEditor;
