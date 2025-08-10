module Api
  class ChatSerializer
    def self.index(chats)
      chats.map { |chat| show(chat) }
    end

    def self.show(chat)
      {
        id: chat.id,
        name: chat.name,
        messages: MessageSerializer.index(chat.messages),
      }
    end
  end
end