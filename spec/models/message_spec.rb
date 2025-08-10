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
  it { is_expected.to belong_to(:chat) }
  it { is_expected.to validate_presence_of(:content) }
  it { is_expected.to validate_presence_of(:chat) }

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:message)).to be_valid
    end
  end
end
