import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Home from '../components/pages/Home/Home';
import Register from '../components/pages/Register/Register';
import Documents from '../components/pages/Documents/Documents';
import Auth from '../components/pages/Auth/Auth';

import './App.scss';
import SVGEditor from '../components/pages/SVGEditor/SVGEditor';


fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container">
              <Switch>
                <Route path='/home' component={Home} authed={authed}/>
                <Route path='/sign-up' component={Register} authed={authed}/>
                <Route path='/editor' render={(props) => <SVGEditor authed={authed} {...props} />} />
                <Route path='/documents' component={Documents} authed={authed}/>
                <Route path='/sign-in' component={Auth} authed={authed}/>
                <Redirect from="*" to="home" />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
