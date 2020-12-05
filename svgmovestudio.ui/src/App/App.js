import './App.scss';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Home from '../components/pages/Home/Home';
import Documents from '../components/pages/Documents/Documents';

class App extends React.Component {
  state = {
    authed: false
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <Switch>
              <Route path='/home' component={Home} authed={authed}/>
              <Route path='/documents' component={Documents} authed={authed}/>
              <Redirect from="*" to="home" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
