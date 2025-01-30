import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId')
  findCommentsByPostId(@Param('postId') postId) {
    return this.commentsService.findCommentsByPostId(postId);
  }

  @Post()
  addComment(@Body() newComment) {
    Logger.log(JSON.stringify(newComment));
    return this.commentsService.addComment(newComment);
  }
}
