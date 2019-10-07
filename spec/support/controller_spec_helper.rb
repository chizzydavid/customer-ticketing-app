module ControllerSpecHelper
  def token_generator(user_id)
    JsonWebToken.encode(user_id: user_id)
  end

  def expired_token_generator(user_id)
    JsonWebToken.encode({ user_id: user_id }, (Time.now.to_i - 10))
  end

  def valid_headers(id = nil)
    {
      'Authorization' => token_generator(id),
      'Content-Type' => 'application/json'
    }
  end

  def invalid_headers
    {
      'Authorization' => nil,
      'Content-Type' => 'application/json'
    }
  end

  def authenticate(email, password)
    token = AuthenticateUser.call(email, password)
    {
      'Authorization' => token.result,
      'Content-Type' => 'application/json'
    }
  end
end
