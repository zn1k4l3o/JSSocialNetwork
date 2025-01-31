import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    return this.commentsService.addComment(newComment);
  }

  @Delete(':postId')
  deleteAllComments(@Param('postId') targetPostId) {
    this.commentsService.deleteCommentsByPostId(targetPostId);
  }
}
