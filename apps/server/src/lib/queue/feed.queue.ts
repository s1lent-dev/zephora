import { RabbitMQService } from "./rabbitmq.lib.js";

class FeedQueue extends RabbitMQService {
    constructor() {
        super();
        this.initQueues();
        this.initConsumers();
    }

    async initQueues() {
        this.createQueue("post-feed");
        this.createQueue("job-feed");
    }

    async initConsumers() {
        this.consumePostFeed();
        this.consumeJobFeed();
    }

    async sendPostFeed(post: any) {
        this.publishMessage("post-feed", post);
    }

    async sendJobFeed(job: any) {
        this.publishMessage("job-feed", job);
    }

    async consumePostFeed() {
        this.consumeMessage("post-feed", (msg) => {
            const postData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending post feed to:", postData);
            // Call the SendEmail service to send the email
        });
    }

    async consumeJobFeed() {
        this.consumeMessage("job-feed", (msg) => {
            const jobData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending job feed to:", jobData);
            // Call the SendEmail service to send the email
        });
    }
}

export { FeedQueue };