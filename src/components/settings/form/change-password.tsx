'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/form-fields/input';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import { useUpdateProfileMutation } from '@/graphql/generated/schema';
import { notification, Spin } from 'antd';
import useAuth from '@/hooks/use-auth';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: 'Password must be 8 character long.' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be 8 character long.' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be 8 character long.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });
  const [Update, { loading }] = useUpdateProfileMutation();
  const { authorize } = useAuth();

  async function handleChangePassword(data: any) {
    console.log('Data:', data);

    try {
      const { data: res } = await Update({
        variables: {
          input: {},
          passwordInput: {
            updatePassword: true,
            oldPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
        },
      });
      if (res?.updateProfile?.success) {
        authorize();
        reset();
        notification.success({
          message: 'Updated',
        });
      } else {
        notification.error({
          message: res?.updateProfile?.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Something went wrong',
      });
    }
  }

  return (
    <div>
      <Text tag="h3" className="mb-4 b b-gray-lighter pb-4 text-xl lg:mb-6">
        Change Password
      </Text>
      <Spin spinning={loading}>
        <form
          noValidate
          onSubmit={handleSubmit((data) => handleChangePassword(data))}
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:gap-y-4">
            <Input
              type="password"
              label="Current password"
              labelClassName="!font-normal lg:text-base"
              {...register('currentPassword')}
              error={errors.currentPassword?.message}
            />
            <Input
              type="password"
              label="New password"
              labelClassName="!font-normal lg:text-base"
              {...register('newPassword')}
              error={errors.newPassword?.message}
            />
            <Input
              type="password"
              label="Confirm password"
              labelClassName="!font-normal lg:text-base"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              className="col-span-2 md:col-span-2"
            />
          </div>
          <div className="mt-8 xl:mt-12">
            <Button
              type="submit"
              size="xl"
              className="w-full transition-transform duration-100 focus:!ring-0 active:scale-95 md:w-auto"
            >
              Update password
            </Button>
          </div>
        </form>
      </Spin>
    </div>
  );
}
