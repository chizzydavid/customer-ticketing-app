  
import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import TextInput from '../components/shared/TextInput';
import Button from '../components/shared/Button';
import axios from 'axios';
import setAuthUser from '../utils/setAuthUser';
import isAuthenticated from '../utils/isAuthenticated';
import { Link, Redirect } from 'react-router-dom';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFormInput = this.validateFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { errors } = this.state;

    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...errors, 
        [e.target.name]: '',
      },
    })
  }

  validateFormInput() {
    let errors = {};
    const emailRegx = /^\S+@\S+\.[\w]+$/;

    Object.entries(this.state).forEach(([property, value]) => {
      const input = typeof value === 'string' ? value.trim() : '';

      switch(property) {
        case 'email':
          if (input.length === 0) {
            errors[property] = 'Email address is required'
          }
          else if (!emailRegx.test(input)) {
              errors[property] = 'Enter a valid email address'
          }
          break;          
        case 'password':
          if (input.length === 0) {
            errors[property] = 'Password is required'
          }
          break;
        default:
          break;     
      }
    });

    if (Object.keys(errors).length !== 0) {
      this.setState({
        errors: {...errors}
      })
      return false;
    } else {
      this.setState({ errors: {} })
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateFormInput()) {
      const user = Object.entries(this.state).reduce(
        (user, [property, input]) => {
          if (typeof input === 'string') {
            user[property] = input.trim();
          }
          return user;
        }, {});

      this.setState({ 
        authError: '',
        isLoading: true 
      });

      axios.post('api/auth/login', user)
        .then(res => {
          this.setState({ isLoading: false });

          if (res.status === 200) {
            setAuthUser(res.data.token);
            this.setState({ redirect: true });
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });

          if (err.response.status === 422 || err.response.status === 401) {
            this.setState({
              authError: err.response.data.error
            })
          }
        });
    }
  }

  render() {
    const { redirect, isLoading, authError } = this.state;
    // if (redirect || isAuthenticated()) {
    //   return <Redirect to="/dashboard" />;
    // }
    const { email, password } = this.state.errors;

    return (
      <React.Fragment>
        <Navbar />
        <div className="container">

          <div className="form-side">
            <h2>Dont have an account?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>

            <Link  to="/sign-up" className="auth-button"> Sign Up </Link>             
            <p className="sign-link" to="/">Forgot Password?</p>
          </div>
       
          <form onSubmit={this.handleSubmit} id="auth-form" encType="multipart/form-data">
            <div className="form-wrapper">
              <h3> Login</h3>
              <span className="error" id="form-feedback">{authError || ''}</span>

              <TextInput 
                error={email || ''} 
                handleChange={this.handleChange} 
                type="text" 
                name="email" 
                placeholder="Enter email" 
                label="Email" 
              />

              <TextInput 
                error={password || ''} 
                handleChange={this.handleChange} 
                type="password" 
                name="password" 
                placeholder="Enter password" 
                label="Password"
              />

              <Button
                type="submit"
                classname="submit"
                text={isLoading ? 'Please wait..' : 'Submit'}
              />
            </div>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default SignUp;
