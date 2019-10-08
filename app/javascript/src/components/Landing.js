import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <React.Fragment>
      <div id="background" className="header-text">
        <p className="sub-text">HELLO, WELCOME.</p>
        <p className="banner-header">Experience customer delivery at its finest.</p>

        <div id="buttons">
          <Link className="start-btn" to="/sign-up">SIGN UP</Link>
          <a className="start-btn" href="/sign-in">LOGIN</a>        
          <p>Click to Learn More..</p>  
        </div>
      </div>

      <section className="" id="about"> 
        <div className="about-text"> 
          <h2 className="subhead">How It Works</h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet volutpat consequat mauris nunc congue nisi. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus
          </p>
        </div>

        <div className=" about-row">
          <div className="about-item" >
            <div className=""><i className="fa fa-sign-in"></i></div>
            <div>
              <h3>Register</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet volutpat consequat mauris nunc congue nisi. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. </p>
            </div> 
          </div>

          <div className="about-item" >
            <div className=""><i className="fa fa-user"></i></div>
            <div>
              <h3>Create a Ticket</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet volutpat consequat ation. </p>
            </div> 
          </div>

          <div className="about-item" >
            <div className=""><i className="fa fa-comments"></i></div>
            <div>
              <h3>Interact with an Agent</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet volutpat consequat mauris nunc congue nisi. </p>
            </div> 
          </div>

        </div>
      </section>
    </React.Fragment>
  )
}

export default Landing
