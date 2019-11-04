import React, { Component } from 'react'
import Button from '../components/shared/Button';
import TextInput from '../components/shared/TextInput';
import axios from 'axios';
import PropTypes from 'prop-types';

export class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      isLoading: false,
      validationErrors: {},
      requestStatus: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateFormInput = this.validateFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { validationErrors } = this.state;

    this.setState({
      [e.target.name]: e.target.value,
      validationErrors: {
        ...validationErrors,
        [e.target.name]: '',
      },
    })
  }

  validateFormInput() {
    let errors = {};

    if (this.state.title.length === 0) {
      errors['title'] = 'Title is required'
    }
    if (this.state.body.length === 0) {
      errors['body'] = 'Body is required'
    }

    if (Object.keys(errors).length !== 0) {
      this.setState({ validationErrors: {...errors} });
      return false;
    } else {
      this.setState({ validationErrors: {} });
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateFormInput()) {

      const newTicket = {
        title: this.state.title.trim(),
        body: this.state.body.trim()
      }

      this.setState({ 
        requestStatus: {},
        isLoading: true 
      });

      axios.post('/api/tickets', newTicket)
        .then(res => {

          if (res.status === 201) {
            this.setState({
              requestStatus: { success: res.data.message },
              isLoading: false,
              title: '',
              body: ''
            });
            setTimeout(() => {
              this.setState({ requestStatus: '' })
            }, 3000);

            this.props.refreshTicketList();
          }
        })
        .catch(err => {
          this.setState({ isLoading: false });

          if (err.response.status === 422 || err.response.status === 401) {
            this.setState({
              requestStatus: { error: error.response.data.error },
              isLoading: false
            })
          }
        });
    }
  }

  render() {
    const { title, body } = this.state.validationErrors;
    const { isLoading, requestStatus } = this.state;
    const { isOpen, close } = this.props;

    return (
      <React.Fragment>
        <div className={isOpen ? 'open create-ticket-container' : 'create-ticket-container'}>
          <p className="close-icon"> 
            <i
              onClick={close} 
              className="fa fa-close"
            >
            </i>
          </p>
          <div className="ticket-form-container">
            <form onSubmit={this.handleSubmit} id="new-ticket-form">
              <h3 className="">Create New Ticket</h3>
              <div>
                <p className={Object.keys(requestStatus)[0]} id="form-feedback">{Object.values(requestStatus)[0]}</p>

                <TextInput 
                  error={title || ''} 
                  handleChange={this.handleChange} 
                  type="text" 
                  name="title"
                  placeholder="Enter Title"
                  label="Title" 
                  value={this.state.title}
                />

                <TextInput 
                  error={body || ''} 
                  handleChange={this.handleChange} 
                  type="text" 
                  name="body" 
                  placeholder="Body" 
                  label="Body"
                  value={this.state.body}
                />
                
                <div id="compose-btn-wrapper"> 
                  <Button
                    id="send-message"
                    type="submit"
                    classname="submit"
                    text={isLoading ? 'Please wait..' : 'Submit'}
                  />
                </div>
              </div>
            </form>
          </div>
        
        </div>
      </React.Fragment>
    )
  }
}

// Compose.propTypes = {
//   sendMessage: PropTypes.func.isRequired,
//   messages: PropTypes.object.isRequired,
//   close: PropTypes.func
// }

export default CreateTicket;
