import React from 'react';
import { Card, CardBody, CardTitle, CardText, NavLink, Row } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import SignUpForm from '../../shared/SignUpForm/SignUpForm';
import authData from '../../../helpers/data/authData';
import './Register.scss';

class Register extends React.Component {

  signUp = (user) => {
    authData.registerUser(user)
      .then(
        this.props.history.push('/home') //push to user profile when that component gets setup
      )
      .catch(error => {
        console.error('there was an error in the user\'s sign in', error)
      })
  }

  render() {
    return (
      <div className="Register">
        <Card className="w-50 mt-3 mx-auto">
          <CardBody>
            <CardTitle className="pb-3" tag="h5">Join SVG Move Studio for Free</CardTitle>
            <Row className="col-6 offset-3">
              <SignUpForm signUp={this.signUp}/>
            </Row>
            <CardText className="d-inline">Already a member? </CardText>
            <NavLink className="navbar-links d-inline" tag={RRNavLink} to='/sign-in'>Sign In</NavLink> 
          </CardBody>
        </Card> 
      </div>
    )
  }
}

export default Register;
