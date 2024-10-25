import { Kafka, Producer } from "kafkajs";

class KafkaService {
  private kafka: Kafka;
  private producer!: Producer;
  constructor() {
    this.kafka = new Kafka({
      clientId: "zephora",
      brokers: ["localhost:9092"],
    });
    this.initAdmin();
  }

  private async initAdmin() {
    const admin = this.kafka.admin();
    admin.connect().then(() => {
    console.log("Admin connected");
    });
    await admin.createTopics({
        topics: [
            {
                topic: "messages",
                numPartitions: 8
            },
            {
                topic: "locations",
                numPartitions: 8
            }
        ],
    });
    await admin.disconnect();
  }

  private async createProducer() {
    if(this.producer) return this.producer;
    this.producer = this.kafka.producer();
    await this.producer.connect();
    return this.producer;
  }
  
}

const kafkaService = new KafkaService();
export { kafkaService };