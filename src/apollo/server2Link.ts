import { ApolloLink, HttpLink } from "@apollo/client";
import { getAuthData } from "../utils/session";
const auth = getAuthData();
const token = auth ? `Bearer ${auth}` : "";


import fetch from 'cross-fetch';
import { SERVER_2 } from "../config/secrets";
export const server2Link = ()=>     {

  return ApolloLink.from([
    new HttpLink({
      uri: SERVER_2,
headers:{
    authorization: `Bearer ${localStorage.getItem('yellow-cartee')??''}`

},
      credentials: 'include',
      fetch
    }),
  ])}