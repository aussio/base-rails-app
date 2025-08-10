class Chat < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :name, presence: true
end

# == Schema Information
#
# Table name: chats
#
#  id         :uuid             not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
