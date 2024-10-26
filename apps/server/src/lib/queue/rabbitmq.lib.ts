import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';

class RabbitMQService {
  private connection!: Connection;
  protected channel!: Channel;

  constructor() {
    this.connect();
  }

  async connect() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    console.log('Connected to RabbitMQ');
  }

  async createQueue(queue: string) {
    await this.channel.assertQueue(queue);
    console.log(`Queue ${queue} created or already exists`);
  }

  async publishMessage(queue: string, message: any) {
    await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to queue ${queue}`, message);
  }

  async consumeMessage(queue: string, handler: (msg: ConsumeMessage | null) => void) {
    await this.channel.consume(queue, (msg) => {
      if (msg) {
        handler(msg);
        this.channel.ack(msg); // Acknowledge message after processing
      }
    });
    console.log(`Consumer set up for queue ${queue}`);
  }
}

const rabbitMQService = new RabbitMQService();
export { rabbitMQService, RabbitMQService };
