import { KafkaService } from "./kafka.lib.js";
import { Message } from "../../types/types.js";
import { prisma } from "../db/prisma.db.js";
class MessageKafkaService extends KafkaService {

  private consumer = this.createConsumer(process.env.KAFKA_TOPIC2_GROUP_ID || "chat-group");
  private topic = process.env.KAFKA_TOPIC2 || 'messages';

  constructor() {
    super();
  }

  async publishMessage(message: Message) {
    await this.producer.send({
      topic: this.topic,
      messages: [{ key: `msg-${Date.now()}`, value: JSON.stringify(message) }],
    });
    console.log("Message published to Kafka:", message);
  }

  async consumeMessages() {
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, pause }) => {
        try {
            const messageValue = message.value ? message.value.toString() : "null";
            const msg = await JSON.parse(messageValue) as Message;
            // send images to multer from msg.media if media exists and store it in s3 and get the hash and store it in the db
            prisma.chat.create({
                data: {
                    senderId: msg.senderId,
                    receiverId: msg.receiverId,
                    message: msg.message
                }
            })
        } catch (err: any) {
            console.error("Error consuming message: ", err);
            pause();
            setTimeout(() => {
                console.log("Resuming consumer...");
                this.consumer.resume([{ topic }]);
            }, 5000);
        }
      },
    });
  }
}

export { MessageKafkaService };
