class Api::TicketsController < Api::RootController
  before_action :set_ticket, only: [:show, :update, :destroy]

  def index
    @tickets = (agent? || admin?) ? 
                Ticket.all.order(created_at: :desc) : 
                current_user.tickets.order(created_at: :desc)

    render json: { tickets: @tickets }, status: :ok
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
    render json: { ticket: @ticket, comments: @ticket.comments }, status: :ok
  end

  def update
    ticket = @ticket.update!(ticket_params)

    if ticket
      render json: {
        message: 'Ticket successfully updated',
        ticket: @ticket,
      }, status: :ok
    end
  end

  def destroy
    @ticket.destroy
    head :no_content
  end

  private

  def ticket_params
    params.permit(
      :title,
      :body,
      :status
    )
  end

  def set_ticket
    @ticket = Ticket.includes(:comments).find(params[:id])

    unless owner?(@ticket) || agent? || admin?
      raise(ExceptionHandler::AccessDenied, 'You dont have permission to access this resource')
    end 
  end
end
