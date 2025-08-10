import React from "react";
import "./Messages.css";
import { safeJson } from "./helpers";

function message_client(chat_id) {
    const baseRoute = `http://localhost:3000/api/chats/${chat_id}/messages`;
    const headers = { "Content-Type": "application/json" };
    const baseFetch = (path, options) => fetch(`${baseRoute}${path}`, { headers, ...options }).then(safeJson);
    return {
      list: () => baseFetch(""),
      create: (message) => baseFetch("", { method: "POST", body: JSON.stringify(message) }),
      destroy: (message_id) => baseFetch(`/${message_id}`, { method: "DELETE" }),
    };
  }
  
  export function Message({ message, setMessages }) {
    const chat_id = message.chat_id;
    function deleteMessage() {
      message_client(chat_id).destroy(message.id).then(() => {
        console.log("deleted message", message);
        message_client(chat_id).list().then((response) => {
          setMessages(response.messages);
        });
      });
    }

    return (
      <div className="message">
        <p>{message.content}</p>
        <button onClick={() => deleteMessage(message.id)}>Delete</button>
      </div>
    )
  }
  
  export function MessageForm({ chat, setMessages }) {
    const [newMessage, setNewMessage] = React.useState("");
  
    function createMessage() {
      const message = { message: { content: newMessage } };
      message_client(chat.id).create(message).then(() => {
        message_client(chat.id).list().then((response) => {
          setMessages(response.messages);
        });
      });
      setNewMessage("");
    }
  
    function handleKeyDown(e) {
      if (e.key === "Enter") {
        createMessage();
      }
    }
  
  return (
      <div className="message-form">
        <input type="text" placeholder="New Message"
               onKeyDown={handleKeyDown}
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
        />
      </div>
    )
  }