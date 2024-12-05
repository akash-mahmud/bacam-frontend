'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';
import useAuth from '@/hooks/use-auth';
import { Menu, Transition } from '@headlessui/react';
import Avatar from '@/components/ui/avatar';
import { Routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

interface MenuItemProps {
  text: string;
  link?: string;
}

const menu = {
  top: [
    {
      path: Routes.private.inbox,
      text: 'Message',
    },
    {
      path: Routes.private.trips,
      text: 'Trips',
    },
    {
      path: Routes.private.wishlist,
      text: 'Wishlist',
    },
  ],
  bottom: [
    {
      path: Routes.private.dashboard,
      text: 'Dashboard',
    },
    {
      path: Routes.private.accountSettings,
      text: 'settings',
    },
    {
      path: Routes.public.help,
      text: 'Help',
    },
  ],
};

function MenuItem({ text, link }: MenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={`${link}`}
          className={clsx(
            'block rounded-sm py-2 px-5   text-base font-normal capitalize text-gray-dark',
            active && 'bg-gray-lightest',
          )}
        >
          {text}
        </Link>
      )}
    </Menu.Item>
  );
}

export default function ProfileMenu({ className }: { className?: string }) {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <Menu
        as="div"
        className={clsx(
          'relative h-9 w-9 rounded-full bg-white card sm:h-10 sm:w-10 2xl:h-12 2xl:w-12 2xl:"" 2xl:gray-lighter 2xl:p-[3px]',
          className,
        )}
      >
        <Menu.Button className="relative h-full w-full rounded-full bg-white">
          <Link href={Routes.private.account}>
            <Avatar
              name={`${user?.firstname} ${user?.lastname}`}
              className="cursor-pointer"
              src={user?.avater ?? ''}
              rounded="full"
              size="100%"
            />
          </Link>
        </Menu.Button>
      </Menu>
    </>
  );
}
