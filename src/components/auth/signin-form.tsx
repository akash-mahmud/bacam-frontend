'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Routes } from '@/config/routes';
import Input from '@/components/ui/form-fields/input';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/form-fields/checkbox';
import useAuth from '@/hooks/use-auth';
import { useModal } from '@/components/modals/context';
import {useAppDispatch, useAppSelector} from '@/store'

// import {useDispatch} from 'react-redux'
import { login } from '@/store/slices/auth/authSlice';
import { useCallback, useState } from 'react';
import { notification, Spin } from 'antd'
import { useLoginMutation, User } from '@/graphql/generated/schema';
import { USER_COOKIE } from '@/utils/session';
import { useRouter, useSearchParams } from 'next/navigation';

const loginInfoSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'The email is required.' })
    .email({ message: 'The email is invalid.' }),
  password: z
    .string()
    .min(4, { message: 'Password must be 4 character long.' }),
  // remember: z.boolean(),
});

type SignInType = z.infer<typeof loginInfoSchema>;

export default function SigninForm() {
  const { authorize } = useAuth();
  const { closeModal } = useModal();
  
const searchQuery = useSearchParams()
const redirectTo = searchQuery?.get("redirectTo")
  const {
    register,
    
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(loginInfoSchema),
  });
const [Login, {error , loading}] = useLoginMutation()
  // TO-DO: Send data to API onSubmit.
  const router = useRouter()
const handleFormSubmit = useCallback(
  async(data: SignInType) => {

    try {
      const {data:res} = await Login({
        variables:{
        ...data
        }
       })
       if (res?.login?.success) {
        const {accessToken , user} = res?.login
        const localStoreVal = {
          token: accessToken
        }
        localStorage.setItem(USER_COOKIE,accessToken??"")
        authorize()
        if (redirectTo) {
         router.push(redirectTo)
   
        }else{
         router.push('/')
   
        }
        notification.success({
         message:'Logged in'
        })
       }else{
    console.log(res);
    notification.error({
      message:res?.login?.message
     })
       }
    } catch (error:any) {
      console.log(error);
      notification.error({
        message:error.message
       })
    }



 
 
     closeModal();
  },
  [router],
)
console.log(error);

  return (
    <Spin  spinning={loading}>
      
    <form noValidate onSubmit={handleSubmit((d) => handleFormSubmit(d))}>
      <Input
        type="text"
        label="Email"
        className="mb-4"
        error={errors?.email?.message}
        required
        {...register('email')}
      />
      <Input
        type="password"
        label="Password"
        className="mb-4"
        error={errors?.password?.message}
        required
        {...register('password')}
      />
      {/* <div className="mb-7 flex items-center justify-between">
        <Checkbox
          size="sm"
          label="Remember Me"
          labelClassName="ml-2"
          inputClassName="!text-gray-dark"
          {...register('remember')}
        />
        <Link
          href={Routes.auth.forgotPassword}
          className="  text-sm font-semibold leading-6 text-primary underline"
        >
          Forget Password?
        </Link>
      </div> */}
      <Button type="submit" className="mb-2 w-full" size="xl">
        Sign In
      </Button>
      <p className="text-sm font-semibold leading-6 text-gray">
        Not member yet?{' '}
        <Link href={Routes.auth.signUp} className="text-primary underline">
          Create an account
        </Link>
      </p>

    </form>
  </Spin>
  );
}
