import { ApolloLink } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';


import fetch from 'cross-fetch';
import { SERVER_1 } from "../config/secrets";
export const server1Link =  ()=> { 

  return ApolloLink.from([
  
    createUploadLink({
      uri: SERVER_1,
      headers: {      
        authorization:typeof window !=='undefined' ? `Bearer ${localStorage.getItem('yellow-cartee')}`:"",
        'Apollo-Require-Preflight': 'true',
// 'Access-Control-Allow-Credentials':'true'
    },
      credentials: 'include',
      fetch,

    }),
  ])}