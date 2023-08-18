import { ArtsyResult } from '../artsy/artsy-response';
import { BaseArtData } from './base-art-data';

export type Show = BaseArtData & {
  description: string | null;
};

export const formatShow = (response: ArtsyResult): Show => {
  const { type, title, description } = response;
  const artsyId = response._links.self.href.split('/shows/')[1];
  const artsyLink = response._links.permalink?.href ?? undefined;
  const thumbnail = response._links.thumbnail?.href ?? undefined;
  return { artsyId, type, title, description, artsyLink, thumbnail };
};
