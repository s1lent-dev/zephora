import { RabbitMQService } from "./rabbitmq.lib.js";

class EmailQueue extends RabbitMQService {

  constructor() {
    super();
    this.initQueues();
    this.initConsumers();
  }

  async initQueues() {
    await this.createQueue("password-reset");
    await this.createQueue("welcome-email");
    await this.createQueue("job-suggestion-email");
    await this.createQueue("aspirant-suggestion-email");
    await this.createQueue("password-auto-create");
  }

  async initConsumers() {
    await this.consumeWelcomeEmail();
    await this.consumePasswordResetEmail();
    await this.consumeJobSuggestionEmail();
    await this.consumeAspirantSuggestionEmail();
    await this.consumePasswordAutoCreateEmail();
  }
    
    // Callbacks for publishing messages to the queues
    async sendWelcomeEmail(email: string) {
        await this.publishMessage("welcome-email", { email });
    }

    async sendPasswordResetEmail(email: string) {
        await this.publishMessage("password-reset", { email });
    }

    async sendJobSuggestionEmail(email: string) {
        await this.publishMessage("job-suggestion-email", { email });
    }

    async sendAspirantSuggestionEmail(email: string) {
        await this.publishMessage("aspirant-suggestion-email", { email });
    }

    async sendPasswordAutoCreateEmail(email: string) {
        await this.publishMessage("password-auto-create", { email });
    }


    // Callbacks for consuming messages from the queues
    async consumeWelcomeEmail() {
        await this.consumeMessage("welcome-email", (msg) => {
            const emailData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending welcome email to:", emailData.email);
            // Call the SendEmail service to send the email
        });
    }

    async consumePasswordResetEmail() {
        await this.consumeMessage("password-reset", (msg) => {
            const emailData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending password reset email to:", emailData.email);
            // Call the SendEmail service to send the email
        });
    }

    async consumeJobSuggestionEmail() {
        await this.consumeMessage("job-suggestion-email", (msg) => {
            const emailData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending job alerts to:", emailData.email);
            // Call the SendEmail service to send the email
        });
    }

    async consumeAspirantSuggestionEmail() {
        await this.consumeMessage("aspirant-suggestion-email", (msg) => {
            const emailData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending aspirant alerts to:", emailData.email);
            // Call the SendEmail service to send the email
        });
    }

    async consumePasswordAutoCreateEmail() {
        await this.consumeMessage("password-auto-create", (msg) => {
            const emailData = JSON.parse(msg?.content.toString() || "");
            console.log("Sending password auto create email to:", emailData.email);
            // Call the SendEmail service to send the email
        });
    }
}

export { EmailQueue };