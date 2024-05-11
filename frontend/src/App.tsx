import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to server");
      setSocket(socket);
    };

    socket.onmessage = (m) => {
      console.log("Received message: ", m.data);
      setMessage((message) => [...message, m.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) return <div>Connecting to Socket Server...</div>;

  return <div>{message}</div>;
}

export default App;
