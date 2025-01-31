import { Injectable, Module } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { PostsModule } from './posts.module';
import { CreatePostDTO } from 'src/types';

@Module({
  imports: [PostsModule],
})
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findPosts(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  findPostsByUserId(userId: string) {
    return this.postModel.find({ userId }).exec();
  }

  findPostById(postId: string) {
    return this.postModel.findById(postId);
  }

  addPost(post: CreatePostDTO) {
    return this.postModel.create(post);
  }

  deletePost(postId) {
    return this.postModel.findOneAndDelete({ _id: postId });
  }

  patchPost(postId, postChanges) {
    return this.postModel.findByIdAndUpdate(
      { _id: postId },
      {
        title: postChanges.title,
        content: postChanges.content,
        timestamp: postChanges.timestamp,
      },
      { new: true },
    );
  }
}
