import { ApolloLink } from "@apollo/client";
import { authLink } from "./authLink";
import { splitOperation } from "./splitOperation";
import { tokenRefreshLink } from "./tokenRefreshLink";

  
export const link = ApolloLink.from([tokenRefreshLink, authLink,splitOperation   ])
