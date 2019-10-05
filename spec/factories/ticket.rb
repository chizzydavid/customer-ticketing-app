FactoryBot.define do
  factory :ticket do
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.sentence }
    user
    status { 'open' }
  end
end
