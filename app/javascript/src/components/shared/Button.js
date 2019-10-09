import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ id, type, text, onClick, classname }) => (
  <button
    id={id}
    className={classname}
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  classname: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  id: '',
  type: 'submit',
  classname: 'b-button',
};

export default Button;
