import { BaseArtData } from './base-art-data';

export type Artwork = BaseArtData & {
  description: string | null;
};
