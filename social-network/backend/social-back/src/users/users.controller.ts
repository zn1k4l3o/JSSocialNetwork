import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll() {
    return this.usersService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id') userId: string) {
    return this.usersService.findUserById(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  patchUser(@Param('id') id: string, @Body() user) {
    //return this.usersService.validateUserAndPassword(id, user);
    return id + user;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') userId) {
    return this.usersService.deleteUser(userId);
  }
}
