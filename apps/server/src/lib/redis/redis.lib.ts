import Redis from "ioredis";

class RedisService {
  protected client: Redis | null = null;

  constructor() {
    this.initClient();
  }
  
  async initClient() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });
    this.client.on('connect', () => {
      console.log('Redis connected');
    });
    this.client.on('error', (err) => {
      console.error('Redis error', err);
    });
  }

  async disconnect() {
    if (this.client) {
      await this.client.quit();
      console.log('Redis disconnected');
    }
  }
};

export { RedisService };
