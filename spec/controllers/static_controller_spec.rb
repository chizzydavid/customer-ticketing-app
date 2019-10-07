require 'rails_helper'

RSpec.describe StaticController, type: :controller do
  # Test suite for GET /
  let(:headers) { valid_headers(1) }

  describe 'GET /' do
    before do
      request.headers.merge!(headers)
      get :index, params: {}
    end
    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

end
