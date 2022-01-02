import { LinkDocument } from '../../schemas/link.schema';

export interface AllLinksResponseInterface {
  links: LinkDocument[];
  totalLinks: number;
  totalPages: number;
  currentPage: number;
}
