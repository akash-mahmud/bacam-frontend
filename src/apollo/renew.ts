import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { RefreshTokenDocument } from "../graphql/generated/schema";
import fetch from 'cross-fetch';

import { SERVER_1 } from "../config/secrets";
import { token } from "./authLink";

export const renewTokenApiClient = new ApolloClient({
    link:     new HttpLink({
      uri: SERVER_1,
      headers: {
        authorization:typeof window !=='undefined' ? `Bearer ${token}`:"",
        'Apollo-Require-Preflight': 'false'
    },
      credentials: 'include',
      fetch
    }),
    cache:new InMemoryCache(),
  })
  export const refreshToken = async ():Promise<string|null> => {
  try {
    const {data} = await renewTokenApiClient.mutate({
      mutation:RefreshTokenDocument
    })
    
      const newAccessToken = data?.refreshToken
      console.log(data);
      
    return newAccessToken
  } catch (error) {
    return ''

  }

  };