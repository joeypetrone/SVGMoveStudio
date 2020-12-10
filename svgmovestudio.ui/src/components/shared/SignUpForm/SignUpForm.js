import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import './SignUpForm.scss';

class SignUpForm extends React.Component {
  static propTypes = {
    signUp: PropTypes.func.isRequired
  }

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
    this.props.signUp(user);
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
      <div className="SignUpForm">
        <Form>
          <FormGroup>
            <Input 
              type="username" 
              name="username" 
              id="username" 
              placeholder="Username"
              value={user.username}
              onChange={this.usernameChange} 
            />          
          </FormGroup>
          <FormGroup>
            <Input
              type="email" 
              name="email" 
              id="exampleEmail" 
              placeholder="Email"
              value={user.email}
              onChange={this.emailChange} 
            />
          </FormGroup>
          <FormGroup>
            <Input 
              type="password" 
              name="password" 
              id="examplePassword" 
              placeholder="Password"
              value={user.password}
              onChange={this.passwordChange}  
            />
          </FormGroup>
          <Button className="btn-dark mb-3 w-100" onClick={this.signUpClickEvent}>Sign Up</Button>
        </Form>
      </div>      
    )
  }
}

export default SignUpForm;
