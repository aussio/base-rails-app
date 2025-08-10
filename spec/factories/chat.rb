FactoryBot.define do
  factory :chat do
    name { Faker::Movies::StarWars.planet }

    after(:create) do |chat, evaluator|
      create_list(:message, evaluator.messages_count, chat: chat)
    end
  end
end