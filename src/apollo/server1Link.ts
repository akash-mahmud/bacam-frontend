import { ApolloLink } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';


import fetch from 'cross-fetch';
import { SERVER_1 } from "../config/secrets";
import { token } from "./authLink";
export const server1Link =  ()=> { 

  return ApolloLink.from([
  
    createUploadLink({
      uri: SERVER_1,
      headers: {      
        authorization:typeof window !=='undefined' ? `Bearer ${token}`:"",
        'Apollo-Require-Preflight': 'true',
// 'Access-Control-Allow-Credentials':'true'
    },
      credentials: 'include',
      fetch,

    }),
  ])}