
import {getAuthData} from '../utils/session'
import { ApolloLink } from "@apollo/client";
const auth = getAuthData();

// export const token = typeof window !=='undefined'? JSON.parse(localStorage.getItem('yellow-cartee')??"{}")?.token:""



export const authLink = new ApolloLink((operation, forward) => {
  
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:typeof window !=='undefined' ? `Bearer ${typeof window !=='undefined'?localStorage.getItem('yellow-cartee')&& JSON.parse(localStorage.getItem('yellow-cartee')??"{}")?.token:""}`:"",
    },
  }));

  return forward(operation);
});