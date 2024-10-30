'use client';
import client from '@/apollo/client';
import { ApolloProvider } from '@apollo/client';
import React, { ReactNode } from 'react';

export default function PublicApolloClient({
  children,
}: {
  children: ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
