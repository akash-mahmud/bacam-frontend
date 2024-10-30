import { ApolloLink, HttpLink } from '@apollo/client';

import fetch from 'cross-fetch';
import { SERVER_2 } from '../config/secrets';
export const server2Link = () => {
  return ApolloLink.from([
    new HttpLink({
      uri: SERVER_2,
      headers: {},
      credentials: 'include',
      fetch,
    }),
  ]);
};
