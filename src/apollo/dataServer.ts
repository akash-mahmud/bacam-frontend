import { ApolloLink, createHttpLink } from "@apollo/client";


import fetch from 'cross-fetch';
import { DATA_SERVER } from "../config/secrets";
export const dataServerLink =  ()=> { 

  return ApolloLink.from([
  
    createHttpLink({
      uri: DATA_SERVER,
      headers: {      
        // authorization:typeof window !=='undefined' ? `Bearer ${token}`:"",
        'Apollo-Require-Preflight': 'true',
// 'Access-Control-Allow-Credentials':'true'
    },
      credentials: 'include',
      fetch,

    }),
  ])}