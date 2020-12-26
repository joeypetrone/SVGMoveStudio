import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Col, Button } from 'reactstrap';
import './PositionEditor.scss';

class PositionEditor extends React.Component {
  static propTypes = {
    updateElementPosition: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired
  }

  state = {
    x_position: 0,
    y_position: 0
  }

  componentDidMount() {
    const { selectedElement } = this.props;

    if (selectedElement) {
      if(Object.entries(selectedElement).length === 0) {
        this.setState({scale: 0, strokeWidth: 0})
      } else {
        const scale = selectedElement.scale;
        const strokeWidth = selectedElement.strokeWidth;
        this.setState({scale, strokeWidth})
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        if(Object.entries(selectedElement).length === 0) {
          this.setState({x_position: 0, y_position: 0})
        } else {
          const x_position = selectedElement.x_Translate;
          const y_position = selectedElement.y_Translate;
          this.setState({x_position, y_position})
        }
      }
    }
  }

  moveElementClickEvent = (e) => {
    const { updateElementPosition } = this.props;
    const { x_position, y_position } = this.state;
    e.preventDefault();
    updateElementPosition(x_position, y_position);
  }

  x_positionChange = e => {
    this.setState({ x_position: e.target.value })
  }

  y_positionChange = e => {
    this.setState({ y_position: e.target.value })
  }

  render() {
    const { selectedElement } = this.props;
    const { x_position, y_position } = this.state;

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
                  name="x_position" 
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
                  name="y_position" 
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
          <Button className="btn-dark mb-3 w-100" onClick={this.moveElementClickEvent} disabled={disable()}>Submit Change</Button>
        </Form>
      </div>
    )
  }
}

export default PositionEditor;
