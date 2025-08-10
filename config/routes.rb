require "sidekiq/web"

Rails.application.routes.draw do
  # Defines the root path route ("/")
  root "home#index"
  mount Sidekiq::Web => "/sidekiq"

  namespace :api do
    get "routes", to: "routes#index"

    get "chats", to: "chats#index"
    post "chats", to: "chats#create"
    put "chats/:chat_id", to: "chats#update"
    get "chats/:chat_id", to: "chats#show"
    delete "chats/:chat_id", to: "chats#destroy"

    get "chats/:chat_id/messages", to: "messages#index"
    post "chats/:chat_id/messages", to: "messages#create"
    put "chats/:chat_id/messages/:message_id", to: "messages#update"
    get "chats/:chat_id/messages/:message_id", to: "messages#show"
    delete "chats/:chat_id/messages/:message_id", to: "messages#destroy"
  end

  # Catch-all route for frontend (except for /api and /sidekiq)
  get '*path', to: 'home#index', constraints: lambda { |req|
    req.path.exclude?('api') && req.path.exclude?('sidekiq')
  }
end
