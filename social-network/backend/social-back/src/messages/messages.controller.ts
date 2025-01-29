import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  async findMessagesById() {
    return this.messagesService.findMessages();
  }

  @Post()
  addPost(@Body() newMessage) {
    return this.messagesService.addMessage(newMessage);
  }
}
