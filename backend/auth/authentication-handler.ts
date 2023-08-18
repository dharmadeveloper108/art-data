import { ArtsyXappToken } from './artsy-xapp-token';
import { ARTSY_BASE_URL } from '../config';

export class AuthenticationHandler {
  private inMemoryToken?: ArtsyXappToken;

  public async getXappToken(): Promise<ArtsyXappToken> {
    if (this.inMemoryToken && !this.tokenIsExpired(this.inMemoryToken)) {
      return this.inMemoryToken;
    }

    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const response = await fetch(`${ARTSY_BASE_URL}/tokens/xapp_token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ client_id, client_secret })
    });

    const jsonResponse = await response.json();
    const { token, expires_at } = jsonResponse;
    this.inMemoryToken = { token, expires_at };
    return this.inMemoryToken;
  }

  private tokenIsExpired(token: ArtsyXappToken): boolean {
    const now = new Date();
    const expirationDate = new Date(token.expires_at);
    if (expirationDate.setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0)) {
      console.log('in-memory token expired');
      return true;
    }
    console.log('in-memory token not expired yet');
    return false;
  }

  public extractBearerTokenFromRequest = (request: any): string | undefined => {
    const auth_header = request.headers['authorization'];
    return auth_header?.startsWith('Bearer ')
      ? auth_header.split(' ')[1]
      : undefined;
  };
}
