import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  email: string;
  @Prop()
  hasAdmin: boolean;
  @Prop({ required: false })
  salt: string;
  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
