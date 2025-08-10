module Api
  class MessagesController < ApplicationController
    # POST /api/chats/:chat_id/messages
    def create
      chat = Chat.find(params.require(:chat_id))
      message_params = params.require(:message).permit(:content)

      message = chat.messages.create!(message_params)
      render json: { message: MessageSerializer.show(message) }, status: :created
    end

    # GET /api/chats/:chat_id/messages
    def index
      chat = Chat.find(params.require(:chat_id))
      render json: { messages: MessageSerializer.index(chat.messages) }, status: :ok
    end

    # DELETE /api/chats/:chat_id/messages/:id
    def destroy
      message = Message.find(params.require(:message_id))
      message.destroy
      render json: {}, status: :no_content
    end
  end
end