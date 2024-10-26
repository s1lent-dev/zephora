import { Socket } from "socket.io";
import { Server} from 'http'
import { SocketService } from "./socket.lib.js";

class CommentSocket extends SocketService {
    constructor(server: Server) {
        super(server);
    }

    protected registerEvents(socket: Socket) {
        console.log("CommentSocket registerEvents called.");
        socket.on("comment", (msg) => {
            console.log(`Message from ${socket.id}: ${msg}`);
            this.io.emit("comment", msg);
        });
    }
}

export { CommentSocket };