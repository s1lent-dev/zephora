import { app } from './app.js';
import { socketService, io } from './lib/socket.js';
import { createServer } from 'http';

const initServer = async () => {
    try {
        const server = createServer(app);
        io?.attach(server);
        server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
      socketService.initListeners(); 
    } catch (err) {
        console.error(err);
    }
};

initServer();