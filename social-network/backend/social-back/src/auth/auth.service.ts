import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = this.validateUserAndPassword(username, password);
    return user;
  }

  async validateUserAndPassword(username, password) {
    const user = await this.usersService.findUserByUsername(username);
    const salt = user.salt;
    const hashedPass = await bcrypt.hash(password, salt);
    if (user.password !== hashedPass) throw new UnauthorizedException();
    console.log('auth', user);
    const payload = { sub: user._id, user: user };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
      user: user,
    };
  }
  //async registerUser(user) {}

  async registerUser(user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    const newUser = { ...user, password: hashedPass, salt };
    const createdUser = await this.usersService.addUser(newUser);
    const payload = { sub: createdUser._id, user: createdUser };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }
}
