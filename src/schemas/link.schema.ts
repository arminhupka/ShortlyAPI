import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Link {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ default: 0 })
  visits: number;
}

export type LinkDocument = Link & Document;

export const LinkSchema = SchemaFactory.createForClass(Link);
