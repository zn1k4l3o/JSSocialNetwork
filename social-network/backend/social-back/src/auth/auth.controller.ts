import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/login')
  validateOne(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    Logger.log('username ' + username);
    Logger.log('password ' + password);

    return this.authService.validateUserAndPassword(username, password);
  }

  @Post()
  addUser(@Body() user) {
    return this.authService.registerUser(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    Logger.log(req);
    return req.user;
  }
}
