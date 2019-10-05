class Api::Auth::AuthenticationController < Api::RootController
  skip_before_action :authenticate_request

  def authenticate
    token = AuthenticateUser.call(params[:email], params[:password])
    render json: {
      message: 'Login Successful',
      token: token.result
    }, status: 200
  end

end
