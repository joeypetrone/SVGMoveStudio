import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Input, Card, CardBody, CardTitle, CardText, NavLink, Row } from 'reactstrap';
import { Link, NavLink as RRNavLink } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import getAuthErrorMessage from '../../../helpers/authErrors';
import toast from '../../../helpers/toast';
import { validateEmail, hasErrors } from '../../../helpers/validation';
import './Auth.scss';

class Auth extends React.Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: ''
    },
    isSigningIn: false
  }

  validate = () => {
    const { user } = this.state;
    const errors = {
      email: validateEmail(user.email),
      password: user.password ? '' : 'Enter your password.'
    };
    this.setState({ errors });
    return !hasErrors(errors);
  }

  signInClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();

    if (!this.validate()) return;

    this.setState({ isSigningIn: true });
    authData.signInUser({ ...user, email: user.email.trim() })
      .then(() => {
        this.props.history.push('/editor'); //push to user profile when that component gets setup
      })
      .catch(error => {
        console.error('there was an error in the user\'s sign in', error);
        toast.error(getAuthErrorMessage(error));
        this.setState({ isSigningIn: false });
      })
  }

  fieldChange = e => {
    const { name, value } = e.target;
    this.setState(({ user, errors }) => ({
      user: { ...user, [name]: value },
      errors: { ...errors, [name]: '' }
    }));
  }

  render() {
    const { user, errors, isSigningIn } = this.state;
    return (
      <div className="Auth">
        <Card className="w-50 mt-3 mx-auto">
          <CardBody>
            <CardTitle className="pb-3" tag="h5">Welcome to SVG Move Studio!</CardTitle>
            <Row className="col-6 offset-3 w-100">
              <Form noValidate onSubmit={this.signInClickEvent}>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="sign-in-email"
                    placeholder="Email"
                    autoComplete="email"
                    value={user.email}
                    invalid={!!errors.email}
                    onChange={this.fieldChange}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup className="mb-1">
                  <Input
                    type="password"
                    name="password"
                    id="sign-in-password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={user.password}
                    invalid={!!errors.password}
                    onChange={this.fieldChange}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <div className="text-right mb-3">
                  <Link className="small" to="/forgot-password">Forgot password?</Link>
                </div>
                <Button type="submit" className="btn-dark mb-3 w-100" disabled={isSigningIn}>
                  {isSigningIn ? 'Signing In…' : 'Sign In'}
                </Button>
              </Form>
            </Row>
            <CardText className="d-inline">Try it Free! </CardText>
            <NavLink className="navbar-links d-inline" tag={RRNavLink} to='/sign-up'>Register</NavLink>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Auth;
