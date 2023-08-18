import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { ARTSY_BASE_URL } from '../../config';
import { AuthenticationHandler } from '../../auth/authentication-handler';
import { ArtsyResponse, ArtsyResult } from '../artsy-response';
import { Artist, formatArtist } from '../../types/artist';
import { Artwork, formatArtwork } from '../../types/artwork';
import { Show, formatShow } from '../../types/show';
import { SearchPayload } from './search-payload';

export class SearchHandler {
  constructor(private authenticationHandler: AuthenticationHandler) { }

  public async handleArtsySearch(request: Hapi.Request<Hapi.ReqRefDefaults>): Promise<(Artist | Artwork | Show | undefined)[]> {

    try {
      const bearerToken =
        this.authenticationHandler.extractBearerTokenFromRequest(request);

      if (!bearerToken || bearerToken !== process.env.BEARER_TOKEN) {
        throw Boom.unauthorized();
      }

      const { payload } = request;

      if (!payload) {
        throw Boom.badRequest();
      }

      const xappToken = await this.authenticationHandler.getXappToken();

      const query = (payload as SearchPayload).keywords;

      const response = await fetch(
        `${ARTSY_BASE_URL}/search?q=${this.formatQuery(query)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Xapp-Token': xappToken.token
          }
        }
      );

      return this.formatResponse(await response.json());
    } catch (e) {
      console.log(e);

      if (e instanceof BadRequestError) {
        throw Boom.badRequest();
      }
      throw Boom.internal();
    }
  }

  private formatQuery(payload: any) {

    const query = (payload as string).replace(' ', '%25');

    const payloadContainsNonAscii = [...query].some(char => char.charCodeAt(0) > 127);
    if (payloadContainsNonAscii) {
      throw new BadRequestError();
    }
    return query;
  }

  private formatResponse(response: ArtsyResponse) {
    const items = response._embedded.results;

    return this.filterRelevantTypes(items).map((item: ArtsyResult) => {
      return item.type === 'artist'
        ? formatArtist(item)
        : item.type === 'artwork'
          ? formatArtwork(item)
          : formatShow(item);
    });
  }

  private filterRelevantTypes(items: ArtsyResult[]) {
    return items.filter((item: ArtsyResult) => {
      item.type === 'artist' || item.type === 'artwork' || item.type === 'show';
    });
  }
}
