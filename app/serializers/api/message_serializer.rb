module Api
  class MessageSerializer
    def self.index(messages)
      messages.map { |message| show(message) }
    end

    def self.show(message)
      {
        id: message.id,
        content: message.content,
        chat_id: message.chat_id,
      }
    end
  end
end