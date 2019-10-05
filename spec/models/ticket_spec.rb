require 'rails_helper'

RSpec.describe Ticket, type: :model do
  describe 'Associations' do
    it { should belong_to(:user) }
  end

  describe 'Validations' do
    describe '#title' do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_least(2) }
    end

    describe '#description' do
      it { should validate_presence_of(:body) }
      it { should validate_length_of(:body).is_at_least(2) }
    end

    describe '#status' do
      it { should allow_values('open', 'closed', nil).for(:status) }
    end
  end
end
