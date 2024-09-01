import { ApolloLink, createHttpLink } from "@apollo/client";


import fetch from 'cross-fetch';
import { DATA_SERVER } from "../config/secrets";
export const dataServerLink =  ()=> { 
  let token =''
  try {
    token = localStorage.getItem('yellow-cartee') ??'' 
  } catch (error) {
     token =''
  }
  return ApolloLink.from([
  
    createHttpLink({
      uri: DATA_SERVER,
      headers: {      
           authorization: `Bearer ${localStorage.getItem('yellow-cartee')??''}`,
           'Apollo-Require-Preflight': 'true',
// 'Access-Control-Allow-Credentials':'true'
    },
      credentials: 'include',
      fetch,

    }),
  ])}