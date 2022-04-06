import React, { useState, createContext, useEffect } from 'react';

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('pilot');
  const [rfid, setRFID] = useState(1);
  const [wsConnected, setWSConnected] = useState(false);
  var ws = new WebSocket('ws://192.168.1.9:80/slave');
  useEffect(() => {
    ws.onopen = () => {
      // connection opened
      console.log('Connected to server');
      setWSConnected(true);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
      setWSConnected(false);
    };
    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
      setWSConnected(false);
    };
  }, [ws]);
  return (
    <AppContext.Provider
      value={{ mode, setMode, ws, rfid, setRFID, wsConnected }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
