import React, { useState } from 'react';
import axios from 'axios';
import './ChatBox.css'; // Assuming you have basic CSS for styling

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { question: input, type: 'user' }]);
      setInput('');

      axios.post('http://localhost:5001/chat', { question: input })
        .then(response => {
          setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.answer, type: 'ai' }
          ]);
        })
        .catch(error => {
          console.error('Error processing chat message:', error);
          setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Failed to get a response from the server.', type: 'error' }
          ]);
        });
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chat-input-container">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask a question about your research data..." 
        />
        <button onClick={handleSend} className="send-btn">
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;


