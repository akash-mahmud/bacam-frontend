
import {getAuthData} from '../utils/session'
import { ApolloLink } from "@apollo/client";


export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:typeof window !=='undefined' ? `Bearer ${localStorage.getItem('yellow-cartee')}`:"",
    },
  }));

  return forward(operation);
});