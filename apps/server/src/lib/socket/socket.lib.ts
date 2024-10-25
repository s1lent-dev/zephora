import { Server } from "socket.io";
  class SocketService {
    private io: Server | null = null;
    constructor() {
      console.log("Initializing Socket Service...");
      this.io = new Server({
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
    }
    public initListeners = () => {
      const io = this.io;
      io?.on("connection", (socket) => {
        console.log("A user connected with socket id: ", socket.id);
        socket.on("msg", (msg) => {
          console.log("Message received: ", msg);
          io?.emit("msg", msg);
        });
        socket.on("disconnect", () => {
          console.log("Client Disconnected with socket id", socket.id);
        });
      });
    };
    public getSocketServer = () => {
      return this.io;
    };
  }
  const socketService = new SocketService();
  const io = socketService.getSocketServer();
  export { socketService, io };
