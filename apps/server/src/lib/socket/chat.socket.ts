import { SocketService } from "./socket.lib.js";
import { Socket } from "socket.io";
import { Server} from 'http'
class ChatSocket extends SocketService {
    constructor(server: Server) {
        super(server);
    }

    protected registerEvents(socket: Socket) {
        console.log("ChatSocket registerEvents called.");
        socket.on("chat", (msg) => {
            console.log(`Message from ${socket.id}: ${msg}`);
            this.io.emit("chat", msg);
        });
    }
}

export { ChatSocket };