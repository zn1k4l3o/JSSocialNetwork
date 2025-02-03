import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from 'src/types';
import { Post as PostType } from 'src/schemas/post.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  private readonly logger = new Logger(PostsController.name);

  @UseGuards(AuthGuard)
  @Get()
  async findPosts() {
    const posts = await this.postsService.findPosts();
    Logger.log(JSON.stringify(posts));
    return posts;
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  findPostsByUserId(@Param('userId') userId) {
    return this.postsService.findPostsByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Get('post/:postId')
  findPostById(@Param('postId') postId) {
    return this.postsService.findPostById(postId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async addPost(@Body() newPost: CreatePostDTO): Promise<PostType> {
    this.logger.log(newPost);
    return await this.postsService.addPost(newPost);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') postId) {
    return this.postsService.deletePost(postId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  patchPost(@Param('id') postId, @Body() postChanges) {
    return this.postsService.patchPost(postId, postChanges);
  }
}
