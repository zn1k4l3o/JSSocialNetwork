import { Injectable, Module } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule],
})
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  findUserById(userId: string) {
    return this.userModel.findById(userId);
  }

  patchUser(id, user) {
    return id + user;
  }

  addUser(user) {
    return this.userModel.create(user);
  }

  deleteUser(userId) {
    return this.userModel.findByIdAndDelete(userId);
  }
}
