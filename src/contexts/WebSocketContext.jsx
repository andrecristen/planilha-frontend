import React, { createContext, useContext, useEffect, useRef } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);

    useEffect(() => {
        
        ws.current = new WebSocket(process.env.REACT_APP_WEB_SOCKET);

        ws.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onmessage = (message) => {
            console.log('Received message:', message);
            alert('Nova mensagem recebida: ' + message.data);
        };

        return () => {
            ws.current.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={ws.current}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
