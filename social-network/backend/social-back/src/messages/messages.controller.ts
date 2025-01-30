import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/pair')
  async findMessagesById(
    @Query('userId') userId: string,
    @Query('chosenId') chosenId: string,
  ) {
    return this.messagesService.findMessagesById(userId, chosenId);
  }

  @Post()
  addPost(@Body() newMessage) {
    return this.messagesService.addMessage(newMessage);
  }
}
