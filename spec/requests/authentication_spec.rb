require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  # Authentication test suite
  describe 'POST /auth/login' do
    # create test user
    let!(:user) { create(:user) }
    let(:headers) { valid_headers.except('Authorization') }
    let(:valid_credentials) do
      {
        email: user.email,
        password: user.password
      }.to_json
    end
    let(:invalid_credentials) do
      {
        email: Faker::Internet.email,
        password: Faker::Internet.password
      }.to_json
    end

    context 'When request is valid' do
      before do
        post  '/api/auth/login',
              params: valid_credentials,
              headers: headers
      end

      it 'returns an authentication token' do
        expect(json['token']).not_to be_nil
      end
    end

    context 'When request is invalid' do
      before do
        post  '/api/auth/login',
              params: invalid_credentials,
              headers: headers
      end

      it 'returns an error message' do
        expect(json['error']).to match(/Invalid Credentials/)
      end
    end
  end
end
