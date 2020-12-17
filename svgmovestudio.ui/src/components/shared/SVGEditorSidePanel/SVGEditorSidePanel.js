import React from 'react';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Col, Button } from 'reactstrap';
import './SVGEditorSidePanel';

class SVGEditorSidePanel extends React.Component {
  render() {
    return (
      <div className="SVGEditorSidePanel rounded-circle col-3 m-1">
        Position
        <hr/>
        <Form>
          <FormGroup row>
            <Label for="number" sm={5}>Vertical</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  type="number" 
                  name="number" 
                  id="number" 
                  placeholder="0"
                  // value={user.username}
                  // onChange={this.usernameChange} 
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
          <FormGroup row>
            <Label for="number" sm={5}>Horizontal</Label>
            <Col sm={7}>
              <InputGroup>
                <Input 
                  type="number" 
                  name="number" 
                  id="number" 
                  placeholder="0"
                  // value={user.username}
                  // onChange={this.usernameChange} 
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>         
          </FormGroup>
          <Button className="btn-dark mb-3 w-100">Submit Change</Button>
        </Form>      
      </div>
    )
  }
}

export default SVGEditorSidePanel;
