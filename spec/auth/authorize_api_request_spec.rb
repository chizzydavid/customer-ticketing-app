require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  let(:user) { create(:user) }
  let(:header) { { 'Authorization' => token_generator(user.id) } }
  subject(:invalid_request_obj) { described_class.new({}) }
  subject(:request_obj) { described_class.new(header) }

  describe '#call' do
    context 'when valid request' do
      it 'returns user object' do
        result = described_class.call(header).result
        expect(result).to eq(user)
      end
    end

    context 'when invalid request' do
      context 'No token provided' do
        it 'raises a No token provided error' do
          expect { described_class.call({}) }.
            to raise_error(ExceptionHandler::MissingToken, 'No token provided')
        end
      end

      context 'when invalid token' do
        subject(:invalid_request_obj) do
          described_class.call('Authorization' => token_generator(50))
        end

        it 'raises an InvalidToken error' do
          expect { invalid_request_obj }.
            to raise_error(ExceptionHandler::InvalidToken, /Invalid token/)
        end
      end

      context 'when token is expired' do
        let(:header) { { 'Authorization' => expired_token_generator(user.id) } }
        subject(:invalid_request_obj) do
          described_class.call(header)
        end

        it 'raises ExceptionHandler::ExpiredSignature error' do
          expect { invalid_request_obj }.
            to raise_error(
              ExceptionHandler::InvalidToken,
              /Signature has expired/
            )
        end
      end

      context 'fake token' do
        let(:header) { { 'Authorization' => 'foobar' } }
        subject(:invalid_request_obj) do
          described_class.call(header)
        end

        it 'handles JWT::DecodeError' do
          expect { invalid_request_obj }.
            to raise_error(
              ExceptionHandler::InvalidToken,
              /Not enough or too many segments/
            )
        end
      end
    end
  end
end
