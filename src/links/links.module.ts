import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from '../schemas/link.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
})
export class LinksModule {}
