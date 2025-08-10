# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ChatsController, type: :controller do
  let(:response_json) { JSON.parse(response.body, symbolize_names: true) }

  let(:expected_shape) do
    {
      chats: match_array(
        a_hash_including(expected_chat_shape)
      )
    }
  end

  let(:expected_chat_shape) do
    {
      id: String, # uuid
      name: String,
      messages: a_hash_including(expected_message_shape)
    }
  end

  let(:expected_message_shape) do
    {
      id: String, # uuid
      content: String,
      chat_id: String, # uuid
    }
  end

  describe '#index' do
    let!(:chats) { create_list(:chat, 3) }
    it 'returns all chats' do
      get :index, as: :json
      expect(response).to be_successful
      expect(response_json[:chats].length).to eq(3)
      expect(response_json[:chats].first).to match(expected_chat_shape)
    end
  end

  describe '#destroy' do
    let!(:chat) { create(:chat) }
    it 'deletes the chat' do
      expect {
        delete :destroy, params: { chat_id: chat.id }, as: :json
      }.to change(Chat, :count).by(-1)
    end
  end

end
