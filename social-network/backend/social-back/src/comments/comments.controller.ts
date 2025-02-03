import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Get(':postId')
  findCommentsByPostId(@Param('postId') postId) {
    return this.commentsService.findCommentsByPostId(postId);
  }

  @UseGuards(AuthGuard)
  @Post()
  addComment(@Body() newComment) {
    return this.commentsService.addComment(newComment);
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  deleteAllComments(@Param('postId') targetPostId) {
    this.commentsService.deleteCommentsByPostId(targetPostId);
  }
}
