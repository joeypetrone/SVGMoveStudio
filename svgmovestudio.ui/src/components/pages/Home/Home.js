import React from 'react';
import { Container, Row, Col, CardImg, Jumbotron } from 'reactstrap';
import SignUpForm from '../../shared/SignUpForm/SignUpForm';
import authData from '../../../helpers/data/authData';
import './Home.scss';

class Home extends React.Component {

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
    return(
      <div className="Home">
        <Jumbotron className="m-auto bg-white w-100 py-4">
          <h1 className="">Create SVGs and SVG</h1>
          <h1 className="">animations for your website</h1>
          <p className="lead">Easily generate code that you can copy and paste</p>
        </Jumbotron>
        <Container className="mb-3">
          <Row className="mt-3">
            <Col xs="8">
              <CardImg className="rounded" top width="100%" src="https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
            </Col>
            <Col className="SignUpCol rounded" xs="4">
              <Row className="col-8 offset-2 pb-3 text-left">
                <h4>Sign Up!</h4>
                <p className="SignUpInfo">
                  By signing up, you gain access to save your SVGs and SVG animations. Signing up is easy and completely free. Sign up now or continue as a guest.
                </p>
              </Row>
              <Row className="col-8 offset-2">
                <SignUpForm signUp={this.signUp}/>
              </Row>
            </Col>
          </Row> 
        </Container>    
      </div>
    )
  }
}

export default Home;
