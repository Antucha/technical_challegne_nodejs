import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SQSRepository {
    private sqs: AWS.SQS;
    protected queueUrl: string;

    constructor() {
        this.sqs = new AWS.SQS({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    // Método para enviar un mensaje a la cola
    protected async sendMessage(messageBody: string = ' ', messageAttributes: Object = null): Promise<AWS.SQS.SendMessageResult> {
        const params = {
            QueueUrl: this.queueUrl,
            MessageBody: messageBody || ' '
        };

        if (messageAttributes) {
            params['MessageAttributes'] = messageAttributes;
        }

        return this.sqs.sendMessage(params).promise();
    }

    // Método para recibir mensajes de la cola
    protected async receiveMessage(): Promise<AWS.SQS.Message[]> {
        const params = {
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 10, // Puedes ajustar esto según tus necesidades
            VisibilityTimeout: 30 // Tiempo que el mensaje está bloqueado en la cola después de ser leído
        };

        const data = await this.sqs.receiveMessage(params).promise();
        return data.Messages || [];
    }

    // Método para borrar un mensaje de la cola
    protected async deleteMessage(receiptHandle: string): Promise<void> {
        const params = {
            QueueUrl: this.queueUrl,
            ReceiptHandle: receiptHandle
        };

        await this.sqs.deleteMessage(params).promise();
    }

    protected createQueue(queueName: string): Promise<AWS.SQS.CreateQueueResult> {
        const params = {
            QueueName: queueName
        };

        return this.sqs.createQueue(params).promise();
    }
}