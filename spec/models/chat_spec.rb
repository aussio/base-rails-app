require 'rails_helper'

RSpec.describe Chat, type: :model do
  it { is_expected.to have_many(:messages).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:name) }

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:chat)).to be_valid
    end
  end
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