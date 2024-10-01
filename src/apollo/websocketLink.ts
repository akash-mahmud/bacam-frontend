import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import {getAuthData} from '../utils/session'
import { WEBSOCKET_SERVER_1 } from "../config/secrets";
import { token } from "./authLink";
const auth = getAuthData();

export const wsLink = new GraphQLWsLink(
    createClient({
      url: WEBSOCKET_SERVER_1,
      connectionParams: {
        Authorization: token,
      },
      
    }),
  );