import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from 'src/types';
import { Post as PostType } from 'src/schemas/post.schema';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  private readonly logger = new Logger(PostsController.name);

  @Get()
  async findPosts() {
    const posts = await this.postsService.findPosts();
    Logger.log(JSON.stringify(posts));
    return posts;
  }

  @Get(':userId')
  findPostsByUserId(@Param('userId') userId) {
    return this.postsService.findPostsByUserId(userId);
  }

  @Post()
  async addPost(@Body() newPost: CreatePostDTO): Promise<PostType> {
    this.logger.log(newPost);
    return await this.postsService.addPost(newPost);
  }

  @Delete(':id')
  deletePost(@Param('id') postId) {
    return this.postsService.deletePost(postId);
  }

  @Patch(':id')
  patchPost(@Param('id') postId, @Body() postChanges) {
    return this.postsService.patchPost(postId, postChanges);
  }
}
