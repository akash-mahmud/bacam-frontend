'use client';

import { useMeQuery, User } from '@/graphql/generated/schema';

import { useEffect, useState } from 'react';

interface UserType {
  name: string;
  avatar: string;
  role: string;
}

const demoUser = {
  name: 'Jhon Doe',
  avatar:
    'http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png',
  role: 'admin',
};

export default function useAuth() {

const {data , loading, refetch} = useMeQuery()

  
  return {
    isAuthorized: data?.me?.id?true:false,
    user: data?.me,
    loading,
    authorize() {
      refetch()
    },
    unauthorize() {

      //? call server logout and all localstorage and cookie clear function


    },
  };
}
