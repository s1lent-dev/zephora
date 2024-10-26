import { KafkaService } from "./kafka.lib.js";
import { Location as ILocation } from "../../types/types.js";
import { Location } from "../../models/location.model.js";

class LocationKafkaService extends KafkaService {
  private consumer = this.createConsumer(process.env.KAFKA_TOPIC1_GROUP_ID || "location-group");
  private topic = process.env.KAFKA_TOPIC1 || 'locations';

  constructor() {
    super();
  }

  async publishLocation(data: any) {
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log("Location published:", data);
  }

  async consumeLocations() {
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await this.consumer.run({
        eachMessage: async ({ topic, partition, message, pause }) => {
            try {
                const messageValue = message.value ? message.value.toString() : "null";
                const loc = await JSON.parse(messageValue) as ILocation;
                await Location.create({
                    location: loc.location,
                    geo_location: loc.geo_location,
                    user: loc.user
                });
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

export default LocationKafkaService;
