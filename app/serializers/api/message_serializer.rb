module Api
  class MessageSerializer
    def self.index(messages)
      messages.map { |message| show(message) }
    end

    def self.show(message)
      {
        id: message.id,
        content: message.content,
      }
    end
  end
end