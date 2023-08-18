import { ArtsyResult } from '../artsy/artsy-response';
import { BaseArtData } from './base-art-data';

export type Artwork = BaseArtData & {
  description: string | null;
};

export const formatArtwork = (response: ArtsyResult): Artwork => {
  const { type, title, description } = response;
  const artsyId = response._links.self.href.split('/artworks/')[1];
  const artsyLink = response._links.permalink?.href ?? undefined;
  const thumbnail = response._links.thumbnail?.href ?? undefined;
  return { artsyId, type, title, description, artsyLink, thumbnail };
};
