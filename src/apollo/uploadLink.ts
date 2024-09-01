
import {getAuthData} from '../utils/session'
import { ApolloLink } from "@apollo/client";

const token =  `Bearer ${localStorage.getItem('yellow-cartee')??''}`;

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));

  return forward(operation);
});