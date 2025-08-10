FactoryBot.define do
  factory :chat do
    name { Faker::Movies::StarWars.planet }

    transient do
      messages_count { 3 }
    end

    after(:create) do |chat, evaluator|
      create_list(:message, evaluator.messages_count, chat: chat)
    end
  end
end