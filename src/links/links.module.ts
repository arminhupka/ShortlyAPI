import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from '../schemas/link.schema';

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
})
export class LinksModule {}
