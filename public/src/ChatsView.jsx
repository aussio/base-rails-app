import React from "react";

function safeJson(res) {
  return res.text().then(text => {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  });
}

function client() {
  const baseRoute = "http://localhost:3000/api/chats";
  return {
    list: () => fetch(`${baseRoute}`).then(safeJson),
    show: (id) => fetch(`${baseRoute}/${id}`).then(safeJson),
    create: (chat) => fetch(`${baseRoute}`, {
      method: "POST",
      body: JSON.stringify(chat),
    }).then(safeJson),
    update: (id, chat) => fetch(`${baseRoute}/${id}`, {
      method: "PUT",
      body: JSON.stringify(chat),
    }).then(safeJson),
    destroy: (id) => fetch(`${baseRoute}/${id}`, {
      method: "DELETE",
    }).then(safeJson),
  };
}

export default function ChatsView() {
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    client().list().then((chats) => setChats(chats.chats));
  }, []);

  return (
    <div>
      <h1>Chats</h1>
      {chats.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

function Chat({ chat }) {
  return (
    <div>
      <h2>{chat.name}</h2>
      <div className="chat-messages">
        {chat.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <button onClick={() => client().destroy(chat.id)}>Delete</button>
    </div>
  );
}

function Message({ message }) {
  return <div>{message.content}</div>;
}