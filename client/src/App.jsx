import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

const App = () => {
  useEffect(() => {
    socket.emit('create_room');
    socket.on('room_created', (data) => {
      console.log('Room created:', data);
    });
    return () => {
      socket.off('room_created');
    };
  }, []);

  return (
    <div>
      <h1>Hello hareesh</h1>
    </div>
  );
};

export default App;
