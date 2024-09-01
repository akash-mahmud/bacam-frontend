
import {getAuthData} from '../utils/session'
import { ApolloLink } from "@apollo/client";
const auth = getAuthData();


export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('yellow-cartee')??''}`,
    },
  }));

  return forward(operation);
});