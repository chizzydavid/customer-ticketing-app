require 'rails_helper'

RSpec.describe Comment, type: :request do
  let(:user) { create :user }
  let(:agent) { create :user, role: 'agent'}
  let(:ticket) { create :ticket, user: user }
  let(:comments) { create_list :comment, 10, user: user, ticket: ticket }
  let(:comment_id) { comments.first.id }
  let(:headers) { authenticate(user.email, user.password) }
  let(:agent_headers) { authenticate(agent.email, agent.password) }
  let(:url) { "/api/tickets/#{ticket.id}/comments"}

  # Test suite for GET /comments
  describe 'GET /comments' do
    before do
      get url, params:{}, headers: headers
    end
    it 'returns all comments for a tickt' do
      expect(json['comments'].size).to eq(0)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for POST /comments
  describe 'POST /comments' do
    
    context 'when the request is valid' do
      let(:comment) { create :comment, user: user, ticket: ticket }

      context 'a user shouldnt start a conversation' do
        before do
          post url, params: attributes_for(:comment).to_json, headers: headers
        end
  
        it 'returns status code 403' do
          expect(response).to have_http_status(403)
        end
  
        it 'returns a error message' do
          expect(json['error']).to eq('You can comment only after an agent has commented')
        end
      end

      context 'an agent should initiate conversation' do
        let(:comment) { create :comment, user: agent, ticket: ticket }
        before do
          post url, params: attributes_for(:comment).to_json, headers: agent_headers
        end
  
        it 'creates a new comment' do     
          expect(json['message']).to eq('Comment successfully created')
        end
  
        it 'returns status code 201' do
          expect(response).to have_http_status(201)
        end
      end

    end

    context 'when the request is invalid' do
      before do
        post url, params: { body: '' }.to_json, headers: agent_headers
      end
      it 'returns status code 422' do  
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Body can't be blank/)
      end
    end
  end

  # Test suite for DELETE /comments/:id
  describe 'DELETE /comments/:id' do
    before do
      delete "#{url}/#{comment_id}", params: {}, headers: headers
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end  
end
