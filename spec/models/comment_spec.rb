require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'Associations' do
    it { should belong_to(:user) }
    it { should belong_to(:ticket) }
  end

  describe 'Validations' do
    describe '#body' do
      it { should validate_presence_of(:body) }
      it { should validate_length_of(:body).is_at_least(2) }
    end
  end
end
