import { app } from './app.js';
import { socketService, io } from './lib/socket/socket.lib.js';
import { createServer } from 'http';
import { connectMongoDB } from './lib/db/mongoose.db.js';
import { connectPostgresDB } from './lib/db/prisma.db.js';

const initServer = async () => {
    try {
        const server = createServer(app);
        io?.attach(server);
        server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
        });
        await connectMongoDB();
        await connectPostgresDB();
        socketService.initListeners(); 
    } catch (err) {
        console.error(err);
    }
};

initServer();