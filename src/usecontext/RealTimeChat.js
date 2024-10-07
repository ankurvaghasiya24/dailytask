import React, { createContext, useContext, useReducer, useState } from 'react';

const UserContext = createContext();
const MessageContext = createContext();

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [...state, action.payload];
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('User1');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const MessageProvider = ({ children }) => {
  const [messages, dispatch] = useReducer(messageReducer, []);

  return (
    <MessageContext.Provider value={{ messages, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

const Chat = () => {
  const { user } = useContext(UserContext);
  const { messages, dispatch } = useContext(MessageContext);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      dispatch({ type: 'ADD_MESSAGE', payload: { user, text: message } });
      setMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Chat Room</h5>
        </div>
        <div className="card-body" style={{ height: '300px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message"
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RealTimeChat = () => {
  return (
    <UserProvider>
      <MessageProvider>
        <div className="text-center">
          <h1>Real-Time Chat</h1>
        </div>
        <Chat />
      </MessageProvider>
    </UserProvider>
  );
};

export default RealTimeChat;


