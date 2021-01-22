import React from 'react';
import { Button, Form, FormGroup, Input, Card, CardBody, CardTitle, CardText, NavLink, Row } from 'reactstrap';
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
        this.props.history.push('/editor') //push to user profile when that component gets setup
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
            <Row className="col-6 offset-3 w-100">
              <Form>
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
                <Button className="btn-dark mb-3 w-100" onClick={this.signInClickEvent}>Sign In</Button>
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
