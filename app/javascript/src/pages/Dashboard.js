  
import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Spinner from '../components/shared/Spinner';
import Footer from '../components/shared/Footer';
import CreateTicket from '../components/CreateTicket';
import TicketsList from '../components/TicketsList'
import axios from 'axios';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: false,
      ticketCategory: 'all'
    };
    this.openNewTicketModal = this.openNewTicketModal.bind(this);
    this.closeNewTicketModal = this.closeNewTicketModal.bind(this);
    this.getAllTickets = this.getAllTickets.bind(this);
    this.refreshTickets = this.refreshTickets.bind(this);
    this.filterTickets = this.filterTickets.bind(this);
  }

  componentDidMount() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.setState({ isLoading: true });

    axios.get('api/tickets')
    .then(res => {
      this.setState({ isLoading: false });

      if (res.status === 200) {
        this.setState({
          tickets: res.data.tickets
        });
      }
    })
    .catch(err => {
      this.setState({ isLoading: false });

      if (err.response.status === 422 || err.response.status === 401) {
        this.setState({
          fetchError: err.response.data.error
        })
      }
    });
  }

  refreshTickets() {
    this.getAllTickets();
  }

  filterTickets(filter) {
    return this.state.tickets.filter((ticket) => ticket.status === filter);
  }
  
  setTicketCategory(category) {
    this.setState({ ticketCategory: category })
  }

  openNewTicketModal() {
    this.setState({ isOpen: true })
  }

  closeNewTicketModal() {
    this.setState({ isOpen: false })
  }

  render() {
    const { isLoading, tickets, ticketCategory } = this.state;
    const allTickets = ticketCategory === 'all' ? tickets : this.filterTickets(ticketCategory)

    return (
      <React.Fragment>
        <Navbar />

        <CreateTicket
          isOpen={this.state.isOpen}
          close={this.closeNewTicketModal}
          refreshTicketList={this.refreshTickets}
        />

        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2>MY TICKETS</h2>
            <div className="dashboard-controls">
              <select
                onChange={(e => this.setTicketCategory(e.target.value))}
                name="ticket-status"
              >
                <option value="">Filter</option>
                <option value="all">All</option>
                <option value="open"> Open </option>
                <option value="closed"> Closed </option>
              </select>
              <button
                onClick={this.openNewTicketModal} 
                className="submit"
                > Create Ticket
              <i className="fa fa-plus"> </i></button>

            </div>
          </div>

          {isLoading && <Spinner />}

          {!isLoading && <TicketsList
            tickets={allTickets}
          /> }

          {allTickets && !allTickets.length && <h3> There are no items to display..</h3> }
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default Dashboard;
