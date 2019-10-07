FactoryBot.define do
  factory :comment do
    body { Faker::Lorem.sentence }
    user
    ticket
  end
end
