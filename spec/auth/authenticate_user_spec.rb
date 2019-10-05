require 'rails_helper'

RSpec.describe AuthenticateUser do
  let(:user) { create(:user) }
  subject(:valid_auth_obj) do
    described_class.call(user.email, user.password)
  end
  # invalid request subject
  subject(:invalid_auth_obj) do
    described_class.call('foo', 'bar')
  end

  # Test suite for AuthenticateUser#call
  describe '#call' do
    # return token when valid request
    context 'when valid credentials' do
      it 'returns an auth token' do
        token = valid_auth_obj.result
        expect(token).not_to be_nil
      end
    end

    # raise Authentication Error when invalid request
    context 'when invalid credentials' do
      it 'raises an authentication error' do
        expect { invalid_auth_obj }
          .to raise_error(
            ExceptionHandler::AuthenticationError,
            'Invalid Credentials'
          )
      end
    end
  end
end
