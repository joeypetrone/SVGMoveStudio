import React from 'react';
import { Link } from 'react-router-dom';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  render() {


    return(
      <div className="MyNavbar">
        Navbar
      <Link className="btn btn-danger" to={'/home'}>home</Link>
      <Link className="btn btn-danger" to={'/documents'}>documents</Link>
      </div>
    )
  }
}

export default MyNavbar;
