require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Associations' do
    it { should have_many(:tickets).dependent(:destroy) }
  end

  describe 'Validations' do
    it { validate_presence_of(:first_name) }
    it { validate_presence_of(:last_name) }
    it { validate_presence_of(:email) }
    it { validate_presence_of(:password) }
    it { validate_presence_of(:password_confirmation) }
  end
end
