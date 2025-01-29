import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  userId: string;
  @Prop()
  timestamp: string;

  _id: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
