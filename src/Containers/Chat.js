import React, { useState } from 'react';
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore, getTimestamp } from "../firebase";

import SettingsModal from "./SettingsModal";
import Message from './Message';

function Chat({ user }) {
  const [messages, loading, error] = useCollection(
    firestore
      .collection("messages")
      .orderBy("timestamp")
      .limit(50)
  );
  const [input, setInput] = useState("");

  function handleSend(event) {
    event.preventDefault();
    firestore.collection("messages").add({
      message: input,
      uid: user.uid,
      timestamp: getTimestamp()
    });

    setInput("");
  }

  return (
    <section className="page">
      <header className="Chat__top-bar">
        <h1 className="title">Messages</h1>
        <SettingsModal />
      </header>

      <main className="Chat__message-list">
        {loading
          ? "Loading messages..."
          : error
            ? "Unable to load messages"
            : messages.docs.map(message => (
              <Message
                key={
                  message._key.path.segments[
                  message._key.path.segments.length - 1
                  ]
                }
                {...message.data()}
                activeUID={user.uid}
              />
            ))}
      </main>

      <form className="Chat__message-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Type a message..."
          required
          className="message-form__input"
        />
        <button className="message-form__send" title="Send" type="submit">
          SEND
        </button>
      </form>
    </section>
  );
}

export default Chat;