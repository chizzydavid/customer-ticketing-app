import React from 'react'
import PropTypes from 'prop-types';
import Ticket from './Ticket';

const TicketList = (props) => {

  // const formFeedback = feedback ? feedback : errors.error ? errors.error : '';
  const { isLoading, tickets } = props;
  
  return (
    <main className="ticket-wrapper">

      <div>
        {/* <p className={formFeedback ? '' : isLoading ? 'hide' : ''} id="feedback">
          {formFeedback}
        </p> */}
      </div>

      <div className="ticket-container">      
        {tickets && tickets.map((ticket) => 
          <Ticket 
            key={ticket.id}
            ticket={ticket}
          />
        )}
      </div>
    </main>
  )
}

// MessageList.propTypes = {
//   userId: PropTypes.number.isRequired,
//   messages: PropTypes.array.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   feedback: PropTypes.string.isRequired,
//   errors: PropTypes.object.isRequired,
//   handleDelete: PropTypes.func.isRequired
// }

export default TicketList;
