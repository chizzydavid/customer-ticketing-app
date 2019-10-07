class Api::Auth::UsersController < Api::RootController
  skip_before_action :authenticate_request, only: :signup

  def signup
    user = User.create!(user_params).as_json(except: [:password_digest])
    token = JsonWebToken.encode(user_id: user['id'])

    response = {
      message: 'Account successfully created',
      user: user,
      token: token
    }
    render json: response, status: :created
  end

  private

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :role,
      :password_confirmation
    )
  end
end
