import React from "react";
import "./ChatsView.css";
import { Message, MessageForm } from "./Messages";
import { safeJson } from "./helpers";


function chat_client() {
  const baseRoute = "http://localhost:3000/api/chats";
  const headers = { "Content-Type": "application/json" };
  const baseFetch = (path, options) => fetch(`${baseRoute}${path}`, { headers, ...options }).then(safeJson);
  return {
    list: () => baseFetch(""),
    show: (id) => baseFetch(`/${id}`),
    create: (chat) => baseFetch("", { method: "POST", body: JSON.stringify(chat) }),
    update: (id, chat) => baseFetch(`/${id}`, { method: "PUT", body: JSON.stringify(chat) }),
    destroy: (id) => baseFetch(`/${id}`, { method: "DELETE" }),
  };
}

export default function ChatsView() {
  const [chats, setChats] = React.useState([]);
  const [newChatName, setNewChatName] = React.useState("");

  function fetchChats() {
    chat_client().list().then((chats) => setChats(chats.chats));
  }

  function createChat() {
    const chat = { chat: { name: newChatName } };
    chat_client().create(chat).then(fetchChats);
  }

  React.useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1>Chats</h1>
      <div className="chat-form"> 
        <input type="text" placeholder="New Chat" value={newChatName} onChange={(e) => setNewChatName(e.target.value)} />
        <button onClick={createChat}>Create Chat</button>
      </div>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} fetchChats={fetchChats} />
      ))}
    </div>
  );
}

function Chat({ chat, fetchChats }) {
  const [messages, setMessages] = React.useState(chat.messages);

  function deleteChat() {
    chat_client().destroy(chat.id).then(fetchChats);
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <h2>{chat.name}</h2>
        <button onClick={() => deleteChat()}>Delete</button>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} setMessages={setMessages} />
        ))}
        <MessageForm chat={chat} setMessages={setMessages} />
      </div>
    </div>
  );
}