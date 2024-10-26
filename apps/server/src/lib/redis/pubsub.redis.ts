import Redis from "ioredis";
import { RedisService } from "./redis.lib.js";

class PubSubRedis extends RedisService {

    private subscriber: Redis | null = null;
    constructor() {
        super();
        this.subscriber = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
        });
    }
    

    async publish(channel: string, message: string) {
        await this.client?.publish(channel, message);
        console.log(`Message published to channel: ${channel}`);
    }

    async subscribe(channel: string, handler: (message: string) => void) {
        this.subscriber?.subscribe(channel);
        this.subscriber?.on('message', (receivedChannel, message) => {
            if(receivedChannel === channel) {
                console.log(`Received message on channel: ${channel}`);
                handler(message);
            }
        });
    }

    async unsubscribe(channel: string) {
        this.subscriber?.unsubscribe(channel);
    }

}

export { PubSubRedis };