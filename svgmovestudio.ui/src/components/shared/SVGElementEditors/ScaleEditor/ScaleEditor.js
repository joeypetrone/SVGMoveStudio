import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, Col, Button } from 'reactstrap';
import './ScaleEditor.scss';

class ScaleEditor extends React.Component {
  static propTypes = {
    updateElementScale: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired
  }

  state = {
    scale: 0,
    strokeWidth: 0
  }

  componentDidMount() {
    const { selectedElement } = this.props;

    if (selectedElement) {
      const scale = selectedElement.scale;
      const strokeWidth = selectedElement.strokeWidth;
      this.setState({scale, strokeWidth})
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        const scale = selectedElement.scale;
        const strokeWidth = selectedElement.strokeWidth;
        this.setState({scale, strokeWidth})
      }
    } 
  }

  scaleElementClickEvent = (e) => {
    const { updateElementScale } = this.props;
    const { scale, strokeWidth } = this.state;
    e.preventDefault();
    updateElementScale(scale, strokeWidth);
  }

  scaleChange = e => {
    this.setState({ scale: e.target.value })
  }

  strokeWidthChange = e => {
    this.setState({ strokeWidth: e.target.value })
  }

  render() {
    const { scale, strokeWidth } =this.state;

    return (
      <div className="ScaleEditor">
        Scale        
        <hr/>
        <Form>
          <FormGroup row>
            <Label for="scale" sm={7}>Scale</Label>
            <Col sm={5}>
              <InputGroup>
                <Input 
                  type="number" 
                  step="0.1"
                  name="scale" 
                  id="scale" 
                  value={scale}
                  onChange={this.scaleChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          <FormGroup row>
            <Label for="stroke-width" sm={7}>Stroke Width</Label>
            <Col sm={5}>
              <InputGroup>
                <Input 
                  type="number" 
                  name="stroke width" 
                  id="stroke-width" 
                  value={strokeWidth}
                  onChange={this.strokeWidthChange} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
          <Button className="btn-dark mb-3 w-100" onClick={this.scaleElementClickEvent}>Submit Change</Button>
        </Form>
      </div>
    )
  }
}

export default ScaleEditor;
