class Api::CommentsController < Api::RootController
  before_action :set_ticket, only: [:index, :create]
  before_action :set_comment, only: [:destroy]

  def index
    @comments = @ticket.comments.order(created_at: :desc)
    render json: { comments: @comments }, status: :ok
  end

  def create
    @comment = @ticket.comments.create!(
      body: comment_params[:body], 
      user_id: current_user.id
    )

    response = {
      message: 'Comment successfully created',
      comment: @comment
    }
    render json: response, status: :created
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def comment_params
    params.permit(:body, :ticket_id)
  end

  def set_ticket
    @ticket = current_user.tickets.find(params[:ticket_id])
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
