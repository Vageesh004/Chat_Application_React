import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000'); // Replace with your server URL

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off('message');
  }, []);

  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
  };

  return (
    <div className="App">
      <h1>Real-time Chat</h1>
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
