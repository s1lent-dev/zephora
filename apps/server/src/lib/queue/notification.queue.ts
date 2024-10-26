import { RabbitMQService } from './rabbitmq.lib.js';

class NotificationQueue extends RabbitMQService {

    constructor() {
        super();
        this.initQueues();
    }

    async initQueues() {
        this.createQueue("job-alerts");
        this.createQueue("aspirant-alerts");
        this.createQueue("follow-request");
    }

    async sendJobAlert(email: string) {
        this.publishMessage("job-alerts", { email });
    }

    async sendAspirantAlert(email: string) {
        this.publishMessage("aspirant-alerts", { email });
    }

    async sendFollowRequestAlert(email: string) {
        this.publishMessage("follow-request", { email });
    }

    async consumeJobAlert() {
        this.consumeMessage("job-alerts", (msg) => {
            const data = JSON.parse(msg?.content.toString() || "");
            console.log("Sending job alerts to:", data.email);
            // Call the SendEmail service to send the email
        });
    }

    async consumeAspirantAlert() {
        this.consumeMessage("aspirant-alerts", (msg) => {
            const data = JSON.parse(msg?.content.toString() || "");
            console.log("Sending aspirant alerts to:", data.email);
            // Call the SendEmail service to send the email
        });
    }

    async consumeFollowRequestAlert() {
        this.consumeMessage("follow-request", (msg) => {
            const data = JSON.parse(msg?.content.toString() || "");
            console.log("Sending follow request alerts to:", data.email);
            // Call the SendEmail service to send the email
        });
    }
}

const notificationQueue = new NotificationQueue();
export { notificationQueue, NotificationQueue };