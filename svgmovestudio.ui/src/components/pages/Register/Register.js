import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Card, CardBody, CardTitle, CardText, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import './Register.scss';

class Register extends React.Component {
  state = {
    user: {
      username: '',
      email: '',
      password: ''
    }
  }

  signUpClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authData.registerUser(user)
      .then(
        this.props.history.push('/home')
      )
      .catch(error => {
        console.error('there was an error in the user\'s sign in', error)
      })
  }

  usernameChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.username = e.target.value;
    this.setState({ user: tempUser })
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
      <div className="Register">
        <Card className="w-50 mt-3 mx-auto">
          <CardBody>
            <CardTitle className="pb-3" tag="h5">Join SVG Move Studio for Free</CardTitle>
            <Form>
            <FormGroup row>
                <Label for="username" sm={3}></Label>
                <Col sm={6}>
                  <Input 
                    type="username" 
                    name="username" 
                    id="username" 
                    placeholder="Username"
                    value={user.username}
                    onChange={this.usernameChange} 
                  />
                </Col>
              </FormGroup>
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
              <Button className="btn-dark mb-3" onClick={this.signUpClickEvent}>Sign Up</Button>
            </Form>
            <CardText className="d-inline">Already a member? </CardText>
            <NavLink className="navbar-links d-inline" tag={RRNavLink} to='/sign-in'>Sign In</NavLink> 
          </CardBody>
        </Card> 
      </div>
    )
  }
}

export default Register;
