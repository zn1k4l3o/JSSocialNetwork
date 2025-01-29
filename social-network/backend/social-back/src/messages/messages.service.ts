import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  findMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  addMessage(message) {
    return this.messageModel.create(message);
  }
}
