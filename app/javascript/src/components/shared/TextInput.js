import React from 'react'
import PropTypes from 'prop-types';

const TextInput = (props) => {
  return (
    <React.Fragment>
      <p className="label">{props.label}<i className="fa fa-asterisk"></i></p>
      <input
        onChange={props.handleChange}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
      <span className="error">{props.error}</span>
    </React.Fragment>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default TextInput
