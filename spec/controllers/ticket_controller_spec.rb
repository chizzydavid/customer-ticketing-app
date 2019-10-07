require 'rails_helper'

RSpec.describe Api::TicketsController, type: :controller do
  let(:user) { create :user }
  let(:tickets) { create_list :ticket, 10, user: user }
  let(:ticket_id) { tickets.first.id }
  let (:headers) { authenticate(user.email, user.password) }

  # Test suite for GET /tickets
  # describe 'GET /tickets' do
  #   before do
  #     request.headers.merge!(headers)
  #     get :index
  #   end
  #   it 'returns all tickets' do
  #     expect(json['tickets']).not_to be_empty
  #     expect(json['tickets'].size).to eq(10)
  #   end

  #   it 'returns status code 200' do
  #     expect(response).to have_http_status(200)
  #   end
  # end

  # Test suite for POST /tickets
  describe 'POST /tickets' do
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

  # Test suite for GET /tickets/:id
  describe 'GET /tickets/:id' do
    before do
      request.headers.merge!(headers)
      get :show, params: { id: ticket_id }
    end

    context 'when the record exists' do
      it 'returns the ticket' do
        expect(json).not_to be_empty
        expect(json['ticket']['id']).to eq(ticket_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:ticket_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(json['error']).to match(/Couldn't find Ticket/)
      end
    end
  end


  # Test suite for PUT /tickets/:id
  describe 'PUT /tickets/:id' do
    let(:params) do
      { 
        status: 'closed',
        id: ticket_id
      }
    end
    context 'when the record exists' do
      before do
        request.headers.merge!(headers)
        put :update, params: params
      end

      it 'returns the updated record' do
        expect(json).not_to be_empty
        expect(json['ticket']['status']).to eq('closed')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for DELETE /tickets/:id
  describe 'DELETE /tickets/:id' do
    before do
      request.headers.merge!(headers)
      delete :destroy, params: {id: ticket_id}
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end  
end
