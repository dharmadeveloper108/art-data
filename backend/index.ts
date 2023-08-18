import Joi from 'joi';
import { PORT } from './config.js';
import Hapi from '@hapi/hapi';
import { Server } from '@hapi/hapi';
import { SearchHandler } from './artsy/search/search-handler';
import { AuthenticationHandler } from './auth/authentication-handler';

export let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    // port: PORT
    port: 3000,
    host: 'localhost'
  });

  return server;
};

export const start = async function (): Promise<void> {
  server.start();
  console.log('Server running on %s', server.info.uri);

  const authenticationHandler = new AuthenticationHandler();
  const searchHandler = new SearchHandler(authenticationHandler);

  server.route({
    method: 'POST',
    path: '/api/search',
    options: {
      validate: {
        payload: Joi.object({
          keywords: Joi.string().min(1).required()
        })
      },
    },
    handler: async (request) => {
      return await searchHandler.handleArtsySearch(request);
    }
  });

  server.route({
    method: 'GET',
    path: '/api/fairs',
    handler: async (request) => {
      return await searchHandler.handleArtsySearch(request);
    }
  });

  server.route({
    method: 'GET',
    path: '/api/ping',
    handler: () => {
      return {
        statusCode: 204
      };
    }
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init().then(() => start());
