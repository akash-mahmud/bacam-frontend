import { getAuthData } from '../utils/session';
import { ApolloLink } from '@apollo/client';
import { token } from './authLink';

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: typeof window !== 'undefined' ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});
