import React from 'react';
import formatTime from '../utils/formatTime';

const Ticket = (props) => {
  // const imgUrl = `https://res.cloudinary.com/chizzydavid/image/upload/`;
  
  const { id, title, body, created_at } = props.ticket
  const comments = 4;
  return (
		<div className="ticket" data-message-id={id}>
      <h4>{title}	</h4>
      <p className="ticket-owner">Chizzy David at <span><i className="fa fa-calendar"></i> {formatTime(created_at)}</span></p>

      <div> 
        <p className="ticket-body">{body}</p>
        {comments > 0 && <p className="ticket-comment">{comments} comments</p>}

      </div>    
		</div>
  )
};

export default Ticket;
