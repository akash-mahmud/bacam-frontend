import { ApolloLink, HttpLink } from "@apollo/client";
import { getAuthData } from "../utils/session";


import fetch from 'cross-fetch';
import { SERVER_2 } from "../config/secrets";
import { token } from "./authLink";
export const server2Link = ()=>     {

  return ApolloLink.from([
    new HttpLink({
      uri: SERVER_2,
headers:{
  authorization:typeof window !=='undefined' ? `Bearer ${token}`:"",

},
      credentials: 'include',
      fetch
    }),
  ])}