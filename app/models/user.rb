class User < ApplicationRecord
  has_secure_password
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :first_name, 
            :last_name, 
            presence: true, 
            length: { minimum: 2}

  validates :email, 
            presence: true, 
            uniqueness: { case_sensitive: true }, 
            format: { with: VALID_EMAIL_REGEX }

  validates :password,
            presence: true,
            length: { in: 6..20 }

  validates_presence_of :password_confirmation
end
