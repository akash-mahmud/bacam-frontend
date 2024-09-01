'use client';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTime from '@/components/ui/form-fields/date-time-picker';
import PhoneNumber from '@/components/ui/form-fields/phone-number';
import Radio from '@/components/ui/form-fields/radio';
import Input from '@/components/ui/form-fields/input';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import clsx from 'clsx';
import { useState } from 'react';
import useAuth from '@/hooks/use-auth';
import { useUpdateProfileMutation } from '@/graphql/generated/schema';
import { notification, Spin } from 'antd';

const PersonalInfoSchema = z.object({
  firstname: z.string().min(1, { message: 'This field is required!' }),
  lastname: z.string().min(1, { message: 'This field is required!' }),
  email: z
    .string()
    .min(1, { message: 'The email is required!' })
    .email({ message: 'The email is invalid!' }),
  phoneNumber: z.string().min(7, { message: 'Minimum 7 digits!' }),
  // birthDate: z.date().optional(),
  // townCity: z.string().optional(),
  // zipCode: z.string().optional(),
  // bio: z.string().optional(),
  // gender: z.string(),
  // country: z.string().optional(),
  // city: z.string().optional(),
  // streetAddress: z.string().optional(),
  // state: z.string().optional(),
});

type PersonalInfoType = z.infer<typeof PersonalInfoSchema>;

export default function PersonalInfoForm() {
  const {user, authorize} = useAuth()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalInfoType>({
    defaultValues: {
firstname: user?.firstname??"",
lastname: user?.lastname??"",
email: user?.email??"",
phoneNumber: user?.phoneNumber??"",
    },
    resolver: zodResolver(PersonalInfoSchema),
  });
const [Update, {loading}] = useUpdateProfileMutation()
 async function handlePersonalInfo(data: any) {
    console.log('Data:', data);
try {
  const {data:res} = await Update({
    variables:{
      input:data,
      passwordInput:{
        updatePassword:false
      }
    }
  })
  if (res?.updateProfile?.success) {
    authorize()
    notification.success({
      message:"Updated"
    })
  }else{
    notification.error({
      message:res?.updateProfile?.message
    })
  }
} catch (error) {
  notification.error({
    message:"Something went wrong"
  })
}

  }

  return (
    <div>
      <Text
        tag="h3"
        className="mb-4 border-b border-b-gray-lighter pb-4 text-xl lg:mb-6"
      >
        Personal Information
      </Text>
      <Spin spinning={loading}>

      <form
        noValidate
        onSubmit={handleSubmit((data) => handlePersonalInfo(data))}
        className="grid grid-cols-1 gap-8 xl:gap-12"
      >
        <div>
          <div className="mb-4 grid grid-cols-1 gap-3 md:mb-6 xl:gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                label="First name"
                placeholder="First name"
                labelClassName="!font-normal lg:text-base"
                {...register('firstname')}
                error={errors.firstname?.message}
              />
              <Input
                type="text"
                label="Last name"
                placeholder="Last name"
                labelClassName="!font-normal lg:text-base"
                {...register('lastname')}
                error={errors.lastname?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                type="email"
                label="Email"
                placeholder="Email"
                labelClassName="!font-normal lg:text-base"
                {...register('email')}
                error={errors.email?.message}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneNumber
                    country="us"
                    label="Phone Number"
                    labelClassName="!font-normal lg:text-base"
                    buttonClassName="personal-info-phone-input"
                    inputClassName="!pl-14"
                    onChange={onChange}
                    value={value}
                    error={errors?.phoneNumber?.message}
                  />
                )}
              />
            </div>
         
          </div>
       
        </div>
      
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            size="xl"
            variant="outline"
            className="w-full border-gray-dark hover:bg-gray-dark hover:text-white md:w-auto"
          >
            Cancel
          </Button>
          <Button type="submit" size="xl" className="w-full md:w-auto">
            Save
          </Button>
        </div>
      </form>
      </Spin>
    </div>
  );
}
