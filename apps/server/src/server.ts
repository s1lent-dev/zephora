import { app } from './app.js';
import { ChatSocket } from './lib/socket/chat.socket.js';
import { CommentSocket } from './lib/socket/comment.socket.js';
import { LocationSocket } from './lib/socket/location.socket.js';
import { LocationKafkaService } from './lib/kafka/location.kafka.js';
import { MessageKafkaService } from './lib/kafka/message.kafka.js';
import { RedisCache } from './lib/redis/cache.redis.js';
import { PubSubRedis } from './lib/redis/pubsub.redis.js';
import { RedisGeolocation } from './lib/redis/geolocation.redis.js';
import { NotificationQueue } from './lib/queue/notification.queue.js';
import { FeedQueue } from './lib/queue/feed.queue.js';
import { EmailQueue } from './lib/queue/email.queue.js';
import { createServer, Server } from 'http';
import { connectMongoDB } from './lib/db/mongoose.db.js';
import { connectPostgresDB } from './lib/db/prisma.db.js';


const initSockets =  (server: Server) => {
    new ChatSocket(server);
    new CommentSocket(server);
    new LocationSocket(server);
}

const initServices = async () => {
    new LocationKafkaService();
    new MessageKafkaService();
    new NotificationQueue();
    new FeedQueue();
    new EmailQueue();
    new RedisCache();
    new PubSubRedis();
    new RedisGeolocation();
    await connectMongoDB();
    await connectPostgresDB();
}


const initServer = async () => {
    try {
        const server = createServer(app);
        initSockets(server);
        server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
        });
        await initServices();
    } catch (err) {
        console.error(err);
    }
};

initServer();