import { BaseArtData } from './base-art-data';

export type Artist = BaseArtData & {
  description: string | null;
};
