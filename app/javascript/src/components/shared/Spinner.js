import React from 'react'

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="spinner">      
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Spinner
