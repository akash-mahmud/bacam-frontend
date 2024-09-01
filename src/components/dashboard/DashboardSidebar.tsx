'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  CubeIcon,
  XMarkIcon,
  UserIcon,
  
} from '@heroicons/react/24/outline';
import { drawerStateAtom } from '@/components/drawers/view';
import ActionIcon from '@/components/ui/action-icon';
import { Routes } from '@/config/routes';
import Logo from '@/components/ui/logo';
import { BookOpenIcon } from '@heroicons/react/24/solid';

const menu = [
  {
    name: 'My Orders',
    icon: <BookOpenIcon className="h-auto w-5" />,
    path: Routes.private.orders,
  },
  {
    name: 'Account',
    icon: <UserIcon className="h-auto w-5" />,
    path: Routes.private.account,
  },

];

interface navListTypes {
  navListItem: {
    name: string;
    icon?: React.ReactNode;
    path: string;
  }[];
}

function List({ navListItem }: navListTypes) {
  const pathname = usePathname();
  return (
    <ul className="pt-4">
      {navListItem.map((item) => (
        <li
          key={item.name}
          className="border-b border-gray-lightest last:border-b-0"
        >
          <Link
            href={item.path}
            className={clsx(
              'flex items-center gap-3 py-4 px-10 text-base capitalize text-gray-dark hover:bg-gray-lightest',
              {
                'bg-gray-lightest': pathname === item.path,
              }
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DashboardSidebar({ className }: {className:string}) {
  const [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
  return (
    <div className={`ml-auto h-full bg-white md:ml-0 border shadow-lg ${className}`}>
      <div className="flex h-14 items-center justify-between px-10 pt-6 md:h-20 xl:h-24 md:hidden">
        <ActionIcon
          size="sm"
          variant="outline"
          className="border-none !p-0 focus:!ring-0"
          onClick={() => setDrawerState({ ...drawerSate, isOpen: false })}
        >
          <XMarkIcon className="h-6 w-6" />
        </ActionIcon>
      </div>
      <List navListItem={menu} />
    </div>
  );
}
