module ExceptionHandler
  extend ActiveSupport::Concern

  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :bad_request
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized
    rescue_from ExceptionHandler::MissingToken, with: :bad_request
    rescue_from ExceptionHandler::InvalidToken, with: :bad_request
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
  end

  def bad_request (err)
    render json: { error: err.message }, status: 422
  end

  def unauthorized (err)
    render json: { error: err.message }, status: 401
  end

  def not_found (err)
    render json: { error: err.message }, status: 404
  end
end
