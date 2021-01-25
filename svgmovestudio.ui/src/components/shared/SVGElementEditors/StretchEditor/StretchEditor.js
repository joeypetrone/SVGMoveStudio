import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Col } from 'reactstrap';
import './StretchEditor.scss';

class StretchEditor extends React.Component {
  static propTypes = {
    updateElementSkew: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired
  }

  state = {
    x_skew: 0,
    y_skew: 0
  }

  componentDidMount() {
    const { selectedElement } = this.props;

    if (selectedElement) {
      if(Object.entries(selectedElement).length === 0) {
        this.setState({x_skew: 0, y_skew: 0})
      } else {
        const x_skew = selectedElement.x_Skew;
        const y_skew = selectedElement.y_Skew;
        this.setState({x_skew, y_skew})
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;

    if (prevProps.selectedElement !== selectedElement) {
      if (selectedElement) {
        if(Object.entries(selectedElement).length === 0) {
          this.setState({x_skew: 0, y_skew: 0})
        } else {
          const x_skew = selectedElement.x_Skew;
          const y_skew = selectedElement.y_Skew;
          this.setState({x_skew, y_skew})
        }
      }
    }
  }

  x_skewChange = e => {
    const { updateElementSkew } = this.props;
    const x_skew = parseInt(e.target.value);
    this.setState({ x_skew })
    updateElementSkew(x_skew, null);
  }

  y_skewChange = e => {
    const { updateElementSkew } = this.props;
    const y_skew = parseInt(e.target.value);
    this.setState({ y_skew })
    updateElementSkew(null, y_skew);
  }

  render() {
    const { selectedElement } = this.props;
    const {x_skew, y_skew} = this.state;

    const disable = () => {
      if (Object.entries(selectedElement).length === 0) {
        return true;
      } else {
        return false;
      }
    }

    return (
      <div className="StretchEditor">
        Stretch
        <hr/>
        <Form>
          <FormGroup row>
            <Label for="x_skew" sm={5}>Skew Horizontal</Label>
            <Col sm={7}>
              <InputGroup className="mt-3">
                <Input 
                  type="number" 
                  name="skew horizontal" 
                  id="x_skew" 
                  min="-90" 
                  max="90"
                  value={x_skew}
                  onChange={this.x_skewChange}
                  disabled={disable()}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>⊾</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
          <FormGroup row>
            <Label for="skew-vertical" sm={5}>Skew Vertical</Label>
            <Col sm={7}>
              <InputGroup className="mt-3">
                <Input 
                  type="number" 
                  name="skew vertical" 
                  id="skew-vertical"
                  min="-90" 
                  max="90" 
                  value={y_skew}
                  onChange={this.y_skewChange} 
                  disabled={disable()}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>⊾</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default StretchEditor;
