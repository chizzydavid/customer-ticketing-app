class Ticket < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, :body,
            presence: true,
            length: { minimum: 2 }

end
