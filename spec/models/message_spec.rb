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

require 'rails_helper'

RSpec.describe Message, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
