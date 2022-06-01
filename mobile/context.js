import React, { useState, createContext, useEffect } from 'react';

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('pilot');
  const [rfid, setRFID] = useState('No uuid');
  const [wsConnected, setWSConnected] = useState(false);
  let ws;
  useEffect(() => {
    ws = new WebSocket('ws://192.168.1.9:80/slave');
    ws.onopen = () => {
      // connection opened
      console.log('Connected to server');
      setWSConnected(true);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
      console.log('Disconnected from server');
      setWSConnected(false);
    };
    ws.onerror = (e) => {
      // an error occurred
      setWSConnected(false);
    };
    ws.onmessage = (message) => {
      // a message was received
      setRFID(message.data);
    };
  }, []);
  return (
    <AppContext.Provider
      value={{ mode, setMode, ws, rfid, setRFID, wsConnected }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
