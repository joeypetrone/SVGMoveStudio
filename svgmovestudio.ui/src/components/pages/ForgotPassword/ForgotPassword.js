import React from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Form, FormFeedback, FormGroup, Input, NavLink, Row } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import getAuthErrorMessage from '../../../helpers/authErrors';
import toast from '../../../helpers/toast';
import { validateEmail } from '../../../helpers/validation';
import '../Auth/Auth.scss';

class ForgotPassword extends React.Component {
  state = {
    email: '',
    emailError: '',
    isSending: false,
    sentTo: ''
  }

  emailChange = e => {
    this.setState({ email: e.target.value, emailError: '' });
  }

  sendResetEvent = (e) => {
    e.preventDefault();
    const email = this.state.email.trim();
    const emailError = validateEmail(email);

    if (emailError) {
      this.setState({ emailError });
      return;
    }

    this.setState({ isSending: true });
    authData.sendPasswordReset(email)
      .then(() => this.setState({ sentTo: email, isSending: false }))
      .catch(error => {
        // Don't reveal whether an account exists for this email.
        if (error && error.code === 'auth/user-not-found') {
          this.setState({ sentTo: email, isSending: false });
          return;
        }
        console.error('there was an error sending the password reset email', error);
        toast.error(getAuthErrorMessage(error));
        this.setState({ isSending: false });
      });
  }

  render() {
    const { email, emailError, isSending, sentTo } = this.state;

    return (
      <div className="Auth">
        <Card className="w-50 mt-3 mx-auto">
          <CardBody>
            <CardTitle className="pb-3" tag="h5">Reset your password</CardTitle>
            <Row className="col-6 offset-3 w-100">
              {sentTo
                ? (
                  <CardText className="mb-3" role="status">
                    If an account exists for <strong>{sentTo}</strong>, we've sent a link to reset its password. Check your inbox and spam folder.
                  </CardText>
                )
                : (
                  <Form noValidate onSubmit={this.sendResetEvent} className="w-100">
                    <CardText className="small text-muted">Enter your account's email and we'll send you a reset link.</CardText>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        id="forgot-password-email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        invalid={!!emailError}
                        onChange={this.emailChange}
                      />
                      <FormFeedback>{emailError}</FormFeedback>
                    </FormGroup>
                    <Button type="submit" className="btn-dark mb-3 w-100" disabled={isSending}>
                      {isSending ? 'Sending…' : 'Send Reset Link'}
                    </Button>
                  </Form>
                )
              }
            </Row>
            <NavLink className="navbar-links d-inline" tag={RRNavLink} to='/sign-in'>Back to Sign In</NavLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ForgotPassword;
