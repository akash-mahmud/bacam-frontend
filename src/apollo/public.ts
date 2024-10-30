import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { SERVER_1 } from '@/config/secrets';

const publicClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    createHttpLink({
      uri: SERVER_1,

      credentials: 'include',
    }),
  ]),
});

export default publicClient;
