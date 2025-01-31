import { Injectable, Module } from '@nestjs/common';
import { CommentsModule } from './comments.module';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from 'src/schemas/comment.schema';
import { Model } from 'mongoose';

@Module({
  imports: [CommentsModule],
})
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  findCommentsByPostId(postId) {
    return this.commentModel.find({ targetPostId: postId }).exec();
  }

  addComment(newComment) {
    return this.commentModel.create(newComment);
  }

  deleteCommentsByPostId(targetPostId: string) {
    return this.commentModel.deleteMany({ targetPostId });
  }
}
