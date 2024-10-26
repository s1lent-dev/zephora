import { Socket } from "socket.io";
import { Server} from 'http'    
import { SocketService } from "./socket.lib.js";

class LocationSocket extends SocketService {
    constructor(server: Server) {
        super(server);
    }

    protected registerEvents(socket: Socket) {
        console.log("LocationSocket registerEvents called.");
        socket.on("location", (msg) => {
            console.log(`Message from ${socket.id}: ${msg}`);
            this.io.emit("location", msg);
        });
    }
}

export { LocationSocket };