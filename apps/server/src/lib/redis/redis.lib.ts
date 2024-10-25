import { Redis } from "ioredis";
  class RedisService {
    private redis: Redis | null = null;
    constructor() {
      this.createRedisClient();
    }
    private createRedisClient = () => {
      if (!this.redis) {
        const PORT = parseInt(process.env.REDIS_PORT || "6379");
        this.redis = new Redis({
          host: process.env.REDIS_HOST || "localhost",
          port: PORT,
        });
        this.redis.on("connect", () => console.log("Connected to Redis"));
        this.redis.on("error", (err) => console.error(err));
        return this.redis;
      }
    };
    public getRedisClient = () => {
      return this.redis;
    };
  }
  const redisService = new RedisService();
  const redisClient = redisService.getRedisClient();
  export { redisService, redisClient };
