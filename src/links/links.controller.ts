import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { NewLinkDto } from './dto/new-link.dto';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

@Controller('links')
export class LinksController {
  constructor(@Inject(LinksService) private linksService: LinksService) {}

  @Post('/')
  @UseInterceptors(ResponseInterceptor)
  shortLink(@Body() newLinkDto: NewLinkDto) {
    return this.linksService.shortLink(newLinkDto);
  }

  @Get('/:id')
  getRedirect(@Param('id') id: string) {
    return this.linksService.getRedirection(id);
  }

  @Get('/')
  getLinks(@Query('page') page: number) {
    return this.linksService.getLinks(page);
  }
}
