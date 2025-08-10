module Api
  class ChatsController < ApplicationController
    def index
      chats = Chat.all
      render json: { chats: ChatSerializer.index(chats) }, status: :ok
    end

    # POST /api/chats
    # { chat: { name: "My Chat" } }
    def create
      chat_params = params.require(:chat).permit(:name)
      chat = Chat.create!(chat_params)
      render json: { chat: ChatSerializer.show(chat) }, status: :created
    end

    def update
      raise "Not implemented"
    end

    # GET /api/chats/:id
    def show
      chat = Chat.find(params[:id])
      render json: { chat: Api::ChatSerializer.show(chat) }, status: :ok
    end

    def destroy
      chat = Chat.find(params[:id])
      chat.destroy!
      render status: :no_content
    end
  end
end