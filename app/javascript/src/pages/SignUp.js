  
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
      redirect: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
    const nameRegx = /^[a-zA-Z]{2,}$/;
    const emailRegx = /^\S+@\S+\.[\w]+$/;
    const passwordRegx = /^[\w]{6,20}$/;

    Object.entries(this.state).forEach(([property, value]) => {
      const input = typeof value === 'string' ? value.trim() : '';

      switch(property) {
        case 'first_name':
          if (input.length === 0) {
            errors[property] = 'First name is required'
          }
          else if(!nameRegx.test(input)) {
            errors[property] = 'First name must be at least 2 characters in length and contain only letters.'
          }
          break;
        case 'last_name':
          if (input.length === 0) {
            errors[property] = 'Last name is required.'
          }
          else if(!nameRegx.test(input)) {
            errors[property] = 'Last name must be at least 2 characters in length and contain only letters.'
          }          
          break;
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
        else if (!passwordRegx.test(input)) {
            errors[property] = 'Password must be at least 6 characters in length and contain only letters and numbers '
          }
          break;
        case 'password_confirmation':
          if (this.state.password !== input) {
            errors[property] = 'Your two passwords dont match.'
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
      const newUser = Object.entries(this.state).reduce(
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

      axios.post('api/auth/signup', newUser)
        .then(res => {
          this.setState({ isLoading: false });

          if (res.status === 201) {
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
    const { 
      first_name, last_name, email, password, password_confirmation 
    } = this.state.errors;

    return (
      <React.Fragment>
        <Navbar />
        <div className="container"> 
          <div className="form-side">
            <h2>Already a member?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>

            <Link  to="/login" className="auth-button"> Login </Link>          
            <p className="sign-link" to="/">Forgot Password?</p>
            
          </div>   
          <form onSubmit={this.handleSubmit} id="auth-form" encType="multipart/form-data">
            <div className="form-wrapper">
              <h3> Create Account</h3>
              <span className="error" id="form-feedback">{authError || ''}</span>

              <TextInput 
                error={first_name || ''} 
                handleChange={this.handleChange} 
                type="text" 
                name="first_name" 
                placeholder="First name" 
                label="First Name" 
              />

              <TextInput 
                error={last_name || ''} 
                handleChange={this.handleChange} 
                type="text" 
                name="last_name" 
                placeholder="Last name" 
                label="Last Name" 
              />

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

              <TextInput 
                error={password_confirmation || ''} 
                handleChange={this.handleChange} 
                type="password" 
                name="password_confirmation" 
                placeholder="Confirm password" 
                label="Confirm Password" 
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
