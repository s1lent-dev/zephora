import ampq from 'amqplib'

class RabbitMQService {
    private connection: any
    private channel: any
    private queue: string

    constructor() {
        this.queue = 'notfication-queue'
    }

    async connect() {
        this.connection = await ampq.connect('amqp://localhost')
        this.channel = await this.connection.createChannel()
        await this.channel.assertQueue(this.queue, { durable: false })
        console.log('Connected to RabbitMQ')
    }

    // async sendToQueue(message: string) {
    //     await this.channel.sendToQueue(this.queue, Buffer.from(message))
    // }

    // async consume() {
    //     await this.channel.consume(this.queue, (message: any) => {
    //         console.log(`Received message: ${message.content.toString()}`)
    //     }, { noAck: true })
    // }
}

const rabbitMQService = new RabbitMQService()
export { rabbitMQService }