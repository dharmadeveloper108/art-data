import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { ARTSY_BASE_URL } from '../../config';
import { AuthenticationHandler } from '../../auth/authentication-handler';
import { Fair, formatFair } from '../../types/fair';

export class RecommendedFairsHandler {
    constructor(private authenticationHandler: AuthenticationHandler) { }

    public async handleArtsySearch(request: Hapi.Request<Hapi.ReqRefDefaults>): Promise<Fair[]> {

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

            const response = await fetch(
                `${ARTSY_BASE_URL}/fairs?status=running_and_upcoming`,
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

    private formatResponse(response: ArtsyFairsResponse): Fair[] {
        const items = response._embedded.fairs;

        return items.map((item: FairItem) => {
            return formatFair(item)
        });
    }
}
