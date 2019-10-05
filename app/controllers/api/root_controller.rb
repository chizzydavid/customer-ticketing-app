module Api
  class RootController < ApplicationController
    include ExceptionHandler

    before_action :authenticate_request
    attr_reader :current_user

    private

    def authenticate_request
      @current_user = AuthorizeApiRequest.call(request.headers).result
    end

    def unknown_route
      render json: {
        errors: {
          global: "No route matches #{params[:path]}"
        }, status: :not_found
      }
    end
  end
end
