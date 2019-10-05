require 'rails_helper'

RSpec.describe Api::TicketsController, type: :controller do
  # Test suite for POST /tickets
  describe 'POST /tickets' do
    let(:user) { create :user }

    let(:headers) { valid_headers(user.id) }
    let(:ticket) { create :ticket, user: user }

    context 'when the request is valid' do
      before do
        request.headers.merge!(headers)
        post :create, params: attributes_for(:ticket)
      end

      it 'creates a new ticket' do
        expect(json['message']).to eq('Ticket successfully created')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before do
        request.headers.merge!(headers)
        post :create, params: { title: 'Foobar' }
      end
      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Body can't be blank/)
      end
    end
  end
end
