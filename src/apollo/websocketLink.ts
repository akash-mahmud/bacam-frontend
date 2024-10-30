import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// @ts-ignore
import { createClient } from 'graphql-ws';

import { getAuthData } from '../utils/session';
import { WEBSOCKET_SERVER_1 } from '../config/secrets';
const auth = getAuthData();

export const wsLink = new GraphQLWsLink(
  createClient({
    // @ts-ignore

    url: WEBSOCKET_SERVER_1,
    connectionParams: {},
  }),
);
