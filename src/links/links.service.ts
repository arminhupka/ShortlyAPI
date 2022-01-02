import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import { NewLinkDto } from './dto/new-link.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Link, LinkDocument } from '../schemas/link.schema';
import { AllLinksResponseInterface } from './interfaces/all-links-response.interface';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name) private readonly linkDocument: Model<LinkDocument>,
  ) {}

  async shortLink(newLinkDto: NewLinkDto) {
    const newLink = await this.linkDocument.create({
      url: newLinkDto.url,
      slug: nanoid(7),
    });

    return {
      message: 'Link shorted',
      data: newLink,
    };
  }

  async getRedirection(id: string) {
    const link = await this.linkDocument.findOne({ slug: id });

    if (!link) throw new NotFoundException('Link with provided ID not found');

    await this.linkDocument.findOneAndUpdate(
      { slug: id },
      { $inc: { visits: 1 } },
    );

    return link;
  }

  async getLinks(queryPage): Promise<AllLinksResponseInterface> {
    const limit = 15;
    const page = queryPage || 1;

    const linksCount = await this.linkDocument.countDocuments();

    const links = await this.linkDocument
      .find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    return {
      links,
      totalLinks: linksCount,
      totalPages: Math.ceil(linksCount / limit),
      currentPage: Number(page),
    };
  }
}
