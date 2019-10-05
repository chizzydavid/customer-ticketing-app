class Api::TicketsController < Api::RootController
  def create
    ticket = current_user.tickets.create!(ticket_params)

    response = {
      message: 'Ticket successfully created',
      ticket: ticket
    }
    render json: response, status: :created
  end

  private

  def ticket_params
    params.permit(
      :title,
      :body
    )
  end
end
