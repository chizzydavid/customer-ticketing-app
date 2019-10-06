class Api::TicketsController < Api::RootController
  before_action :set_ticket, only: [:show]

  def index
    puts '(((((((((((current user)))))))))))', current_user.inspect
    tickets = current_user.tickets.order(created_at: :desc)
    puts '**********user tickets))))))))))))', tickets
    render json: { tickets: tickets }, status: :ok
  end

  def create
    @ticket = current_user.tickets.create!(ticket_params)

    response = {
      message: 'Ticket successfully created',
      ticket: @ticket
    }
    render json: response, status: :created
  end

  def show
    render json: { ticket: @ticket }, status: :ok
  end
  private

  def ticket_params
    params.permit(
      :title,
      :body
    )
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end
