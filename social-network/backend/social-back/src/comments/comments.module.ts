import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
