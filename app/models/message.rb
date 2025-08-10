class Message < ApplicationRecord
  belongs_to :chat

  validates :content, presence: true
  validates :chat, presence: true
end

# == Schema Information
#
# Table name: messages
#
#  id         :uuid             not null, primary key
#  chat_id    :uuid             not null
#  content    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_messages_on_chat_id  (chat_id)
#