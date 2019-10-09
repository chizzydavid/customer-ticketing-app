  
import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Link, Redirect } from 'react-router-dom';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {

    return (
      <React.Fragment>
        <Navbar />
        <div className="container">    
          <h1>DASHBOARD</h1>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default SignUp;
