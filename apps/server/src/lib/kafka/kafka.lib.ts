import { Kafka, Producer, Consumer } from "kafkajs";

class KafkaService {
  private kafka: Kafka;
  protected producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER || ''],
    });
    this.initAdmin();
    this.producer = this.kafka.producer();
    this.producer.connect().then(() => console.log("Kafka Producer connected"));
  }

  private async initAdmin() {
    const admin = this.kafka.admin();
    await admin.connect();
    console.log("Kafka Admin connected");

    await admin.createTopics({
      topics: [
        { topic: process.env.KAFKA_TOPIC1 || 'locations', numPartitions: parseInt(process.env.KAFKA_TOPIC1_PARTITIONS || '8') },
        { topic: process.env.KAFKA_TOPIC2 || 'messages', numPartitions: parseInt(process.env.KAFKA_TOPIC2_PARTITIONS || '8') },
      ],
    });
    await admin.disconnect();
  }

  // Method to create a consumer
  protected createConsumer(groupId: string): Consumer {
    const consumer = this.kafka.consumer({ groupId });
    consumer.connect().then(() => console.log(`${groupId} consumer connected`));
    return consumer;
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}

export { KafkaService };
