'use client';

import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { addDays } from 'date-fns';
import {  XMarkIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTime from '@/components/ui/form-fields/date-time-picker';
import PhoneNumber from '@/components/ui/form-fields/phone-number';
import Textarea from '@/components/ui/form-fields/textarea';
import { CalenderIcon } from '@/components/icons/calender';
import { useModal } from '@/components/modals/context';
import Input from '@/components/ui/form-fields/input';
import ActionIcon from '@/components/ui/action-icon';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import Rate from '@/components/ui/rating';
import { Routes } from '@/config/routes';
import { useState } from 'react';
import clsx from 'clsx';
import useAuth from '@/hooks/use-auth';
import { useCreateOneBookingMutation } from '@/graphql/generated/schema';
import { useParams } from 'next/navigation';
import { notification, Spin } from 'antd';

const ContactHostSchema = z.object({
    bookingDate: z.date().min(new Date(), { message: 'Select a date.' }),
    bookingTime: z.string(),

  note: z.string(),
});

type ContactHostModalType = z.infer<typeof ContactHostSchema>;

export default function BookNowModal() {
  const { closeModal } = useModal();
  const params = useParams()
  
const {user} = useAuth()
  const [state, setState] = useState(false);
  const [stateTwo, setStateTwo] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactHostModalType>({
    resolver: zodResolver(ContactHostSchema),
  });
const [Create, {loading}] = useCreateOneBookingMutation()
  async function handleReservation(data: any) {
    console.log(data);
    const timeValue = data.bookingTime;
    
    // Create a new Date object and set the time
    const currentDate = new Date(data.bookingDate);
    const [hours, minutes] = timeValue.split(':');
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    
    // Format the Date object as an ISO string
    const isoString = currentDate.toISOString();
try {
    const {data:res} = await Create({
        variables:{
            data:{
                ...data,
                bookingTime: isoString,
    user:{
        connect:{
            email:user?.email
        }
    },
    company:{
        connect:{
    slug:params?.company??""
        }
    }
            }
        }
    })
    
    if (res?.createOneBooking.id) {
        closeModal();
    notification.success({
        message:"Booking completed."
    })
    }else{
        notification.error({
            message:"Something went wrong."
        })
    }
} catch (error) {
    notification.error({
        message:"Something went wrong."
    })
}

  }

  return (
    <div className="mx-auto w-full max-w-full rounded-lg bg-white p-4 xs:w-[480px] sm:w-[600px] sm:p-6 md:w-[648px] md:rounded-xl md:p-8 xl:p-12">
      <div className="flex items-center justify-between">
        <Text tag="h3" className="text-base leading-8 md:!text-xl">
          Booking
        </Text>
        <ActionIcon
          size="sm"
          variant="outline"
          className="border-none !p-0 focus:!ring-0"
          onClick={closeModal}
        >
          <XMarkIcon className="h-6 w-6" />
        </ActionIcon>
      </div>
   <Spin spinning={loading}>

      <form
        noValidate
        onSubmit={handleSubmit((data) => handleReservation(data))}
      >
        <div className="grid grid-cols-2 gap-3 border-gray-lighter py-3 md:border-b md:py-6">
          <Controller
            name="bookingDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTime   
                label="Date"
                placeholderText="Select Date"
                minDate={new Date()}
                selected={value}
                onChange={onChange}
                onFocus={(e) => e.target.blur()}
                dateFormat="eee dd / LL / yy"
                startIcon={
                  <CalenderIcon className="h-4 w-4 text-gray xl:h-5 xl:w-5" />
                }
                startIconClassName="sm:left-2"
                error={errors?.bookingDate?.message}
                inputClassName={clsx(
                  '!text-gray text-xs xl:text-sm sm:pl-12',
                  state &&
                    '!border !border-gray-1000 !ring-[1px] !ring-gray-900/20'
                )}
                labelClassName="!text-sm md:!text-base mb-1.5"
                onCalendarOpen={() => setState(true)}
                onCalendarClose={() => setState(false)}
              />
            )}
          />
           
                  <Input {...register("bookingTime")} label='Time' className='mt-3'   type="time"        error={errors?.bookingTime?.message}/>

       

        </div>
      
        <Textarea
          className="mt-4"
          label="Your message"
          textareaClassName="w-full min-h-[100px] md:min-h-[160px] focus:border-gray-dark py-3 !px-5"
          labelClassName="!text-sm md:!text-base font-bold text-gray-dark"
          {...register('note')}
          error={errors?.note?.message}
        />
        <div className="mt-4 flex md:mt-8 lg:mt-12 ">
          <Button
            type="submit"
            size="lg"
            className="ml-auto !w-24 py-[9px] !font-bold"
          >
            Send
          </Button>
        </div>
      </form>
   </Spin>
    </div>
  );
}
