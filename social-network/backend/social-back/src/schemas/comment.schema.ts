import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  content: string;
  @Prop()
  timestamp: string;
  @Prop()
  ownerId: string;
  @Prop()
  targetPostId: string;

  _id: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
