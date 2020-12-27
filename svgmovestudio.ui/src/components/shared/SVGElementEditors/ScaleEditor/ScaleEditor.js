import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, Col } from 'reactstrap';
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
          this.setState({scale: 0, strokeWidth: 0})
        } else {
          const scale = selectedElement.scale;
          const strokeWidth = selectedElement.strokeWidth;
          this.setState({scale, strokeWidth})
        }
      }
    } 
  }

  scaleChange = e => {
    const { updateElementScale } = this.props;
    const scale = parseFloat(e.target.value);
    this.setState({ scale })
    updateElementScale(scale, null);
  }

  strokeWidthChange = e => {
    const { updateElementScale } = this.props;
    const strokeWidth = parseFloat(e.target.value);
    this.setState({ strokeWidth })
    updateElementScale(null, strokeWidth);
  }

  render() {
    const { scale, strokeWidth } =this.state;
    const { selectedElement } = this.props;

    const disable = () => {
      if (Object.entries(selectedElement).length === 0) {
        return true;
      } else {
        return false;
      }
    }

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
                  step="0.01"
                  name="scale" 
                  id="scale"
                  min="0" 
                  max="10"
                  value={scale}
                  onChange={this.scaleChange} 
                  disabled={disable()}
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
                  step="0.01" 
                  name="stroke width" 
                  id="stroke-width"
                  min="0" 
                  max="100"
                  value={strokeWidth}
                  onChange={this.strokeWidthChange}
                  disabled={disable()} 
                />
              </InputGroup>
            </Col>         
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default ScaleEditor;
