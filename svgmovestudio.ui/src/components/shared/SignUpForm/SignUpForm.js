import React from 'react';
import { Button, Form, FormFeedback, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import getAuthErrorMessage from '../../../helpers/authErrors';
import getApiErrorMessage from '../../../helpers/apiErrors';
import toast from '../../../helpers/toast';
import { validateEmail, validateNewPassword, validateUsername, hasErrors } from '../../../helpers/validation';
import './SignUpForm.scss';

const emptyFields = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

class SignUpForm extends React.Component {
  static propTypes = {
    signUp: PropTypes.func.isRequired
  }

  state = {
    user: { ...emptyFields },
    errors: { ...emptyFields },
    isSigningUp: false
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  validate = () => {
    const { user } = this.state;
    const errors = {
      username: validateUsername(user.username),
      email: validateEmail(user.email),
      password: validateNewPassword(user.password),
      confirmPassword: !user.confirmPassword
        ? 'Re-enter your password.'
        : user.confirmPassword !== user.password ? 'Passwords don\'t match.' : ''
    };
    this.setState({ errors });
    return !hasErrors(errors);
  }

  signUpClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();

    if (!this.validate()) return;

    this.setState({ isSigningUp: true });
    this.props.signUp({
      username: user.username.trim(),
      email: user.email.trim(),
      password: user.password
    })
      .catch(error => {
        console.error('there was an error in the user\'s sign up', error);
        // Firebase errors carry a code; errors saving the profile come from the API.
        toast.error(error && error.code ? getAuthErrorMessage(error) : getApiErrorMessage(error));
        if (!this.unmounted) {
          this.setState({ isSigningUp: false });
        }
      });
  }

  fieldChange = e => {
    const { name, value } = e.target;
    this.setState(({ user, errors }) => ({
      user: { ...user, [name]: value },
      errors: { ...errors, [name]: '' }
    }));
  }

  render() {
    const { user, errors, isSigningUp } = this.state;

    return (
      <div className="SignUpForm">
        <Form noValidate onSubmit={this.signUpClickEvent}>
          <FormGroup>
            <Input
              type="text"
              name="username"
              id="sign-up-username"
              placeholder="Username"
              autoComplete="username"
              value={user.username}
              invalid={!!errors.username}
              onChange={this.fieldChange}
            />
            <FormFeedback>{errors.username}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="sign-up-email"
              placeholder="Email"
              autoComplete="email"
              value={user.email}
              invalid={!!errors.email}
              onChange={this.fieldChange}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="sign-up-password"
              placeholder="Password"
              autoComplete="new-password"
              value={user.password}
              invalid={!!errors.password}
              onChange={this.fieldChange}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="confirmPassword"
              id="sign-up-confirm-password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={user.confirmPassword}
              invalid={!!errors.confirmPassword}
              onChange={this.fieldChange}
            />
            <FormFeedback>{errors.confirmPassword}</FormFeedback>
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
