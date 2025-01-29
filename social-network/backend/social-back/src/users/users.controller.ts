import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

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

  @Patch(':id')
  patchUser(@Param('id') id: string, @Body() user) {
    //return this.usersService.validateUserAndPassword(id, user);
    return id + user;
  }
}
