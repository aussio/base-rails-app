module Api
  class ChatsController < ApplicationController
    def index
      chats = Chat.all.includes(:messages)
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

    # GET /api/chats/:chat_id
    def show
      chat = Chat.find(params[:chat_id])
      render json: { chat: Api::ChatSerializer.show(chat) }, status: :ok
    end

    # DELETE /api/chats/:id
    def destroy
      chat = Chat.find(params[:chat_id])
      chat.destroy!
      render json: {}, status: :no_content
    end
  end
end