import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  message: string;

  @Prop()
  timestamp: string;

  @Prop()
  fromId: string;

  @Prop()
  targetId: string;

  _id: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
