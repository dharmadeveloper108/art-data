import { ArtsyResult } from '../artsy/artsy-response';
import { BaseArtData } from './base-art-data';

export type Artist = BaseArtData & {
  description: string | null;
};

export const formatArtist = (response: ArtsyResult): Artist => {
  const { type, title, description } = response;
  const artsyId = response._links.self.href.split('/artists/')[0];
  const artsyLink = response._links.permalink?.href ?? undefined;
  const thumbnail = response._links.thumbnail?.href ?? undefined;
  return { type, title, description, artsyId, artsyLink, thumbnail };
};
