import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Card, CardBody, CardTitle, CardText, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import './Auth.scss';

class Auth extends React.Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  }

  signInClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authData.signInUser(user)
      .then(
        this.props.history.push('/home')
      )
      .catch(error => {
        console.error('there was an error in the user\'s sign in', error)
      })
  }

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser })
  }

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="Auth">
        <Card className="w-50 mt-3 mx-auto">
          <CardBody>
            <CardTitle className="pb-3" tag="h5">Welcome to SVG Move Studio!</CardTitle>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}></Label>
                <Col sm={6}>
                  <Input 
                    type="email" 
                    name="email" 
                    id="exampleEmail" 
                    placeholder="Email"
                    value={user.email}
                    onChange={this.emailChange} 
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={3}></Label>
                <Col sm={6}>
                  <Input 
                    type="password" 
                    name="password" 
                    id="examplePassword" 
                    placeholder="Password"
                    value={user.password}
                    onChange={this.passwordChange}  
                  />
                </Col>
              </FormGroup>
              <Button className="btn-dark mb-3" onClick={this.signInClickEvent}>Sign In</Button>
            </Form>
            <CardText className="d-inline">Try it Free! </CardText>
            <NavLink className="navbar-links d-inline" tag={RRNavLink} to='/documents'>Register</NavLink> 
          </CardBody>
        </Card>         
      </div>
    )
  }
}

export default Auth;
