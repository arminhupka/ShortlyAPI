import { IsString } from 'class-validator';

export class NewLinkDto {
  @IsString()
  url: string;
}
