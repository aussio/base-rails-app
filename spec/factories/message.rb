FactoryBot.define do
  factory :message do
    chat
    content { Faker::Movies::StarWars.quote }
  end
end