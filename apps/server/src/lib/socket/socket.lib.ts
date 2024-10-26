import { Server, Socket } from "socket.io";
import http from "http";

class SocketService {
  protected io!: Server;

  constructor(server: http.Server) {
    this.io = new Server();
    this.io.attach(server);
    console.log("Socket.IO attached to the server");

    this.io.on("connection", (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);
      this.registerEvents(socket);
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  // Placeholder to be overridden by subclasses
  protected registerEvents(socket: Socket) {
    console.log("Base SocketService registerEvents called.");
  }
}

export { SocketService };
