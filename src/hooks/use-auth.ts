'use client';

import { useMeQuery, User } from '@/graphql/generated/schema';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/slices/auth/authSlice';
import { useEffect } from 'react';


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
const dispatch = useAppDispatch()
useEffect(() => {
if (data?.me?.id) {
  dispatch(setUser(
{    isAuthorized: data?.me?.id?true:false,
    user: data?.me,
    loading,}
  )??{})}
}, [dispatch , data?.me?.id])

  
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
