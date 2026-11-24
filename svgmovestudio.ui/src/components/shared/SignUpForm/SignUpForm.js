import React from 'react';
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import getAuthErrorMessage from '../../../helpers/authErrors';
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
    },
    errorMessage: '',
    isSigningUp: false
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  signUpClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();

    if (!user.username.trim() || !user.email.trim() || !user.password) {
      this.setState({ errorMessage: 'Enter a username, email and password.' });
      return;
    }

    this.setState({ errorMessage: '', isSigningUp: true });
    this.props.signUp(user)
      .catch(error => {
        console.error('there was an error in the user\'s sign up', error);
        if (!this.unmounted) {
          this.setState({ errorMessage: getAuthErrorMessage(error), isSigningUp: false });
        }
      });
  }

  usernameChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.username = e.target.value;
    this.setState({ user: tempUser, errorMessage: '' })
  }

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser, errorMessage: '' })
  }

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser, errorMessage: '' })
  }

  render() {
    const { user, errorMessage, isSigningUp } = this.state;

    return (
      <div className="SignUpForm">
        <Form onSubmit={this.signUpClickEvent}>
          <Alert color="danger" isOpen={!!errorMessage} role="alert">{errorMessage}</Alert>
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
          <Button type="submit" className="btn-dark mb-3 w-100" disabled={isSigningUp}>
            {isSigningUp ? 'Signing Up…' : 'Sign Up'}
          </Button>
        </Form>
      </div>      
    )
  }
}

export default SignUpForm;
