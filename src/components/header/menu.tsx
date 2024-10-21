'use client';

import Link from 'next/link';
import useAuth from '@/hooks/use-auth';
import { Routes } from '@/config/routes';
import ProfileMenu from '@/components/header/profile-menu';
import { useModal } from '@/components/modals/context';
import { useIsMounted } from '@/hooks/use-is-mounted';
import Button from '@/components/ui/button';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ActionIcon from '../ui/action-icon';

const menuItems = [
  {
    id: 1,
    label: 'Home',
    path: Routes.public.home,
  },
  {
    id: 2,
    label: 'Products',
    path: Routes.public.product,
  },
  {
    id: 3,
    label: 'Employee',
    path: "/employee",
  },

];

export default function Menu() {
  const { isAuthorized , loading } = useAuth();
  const mounted = useIsMounted();
const router = useRouter()
  return (
    <nav className="primary-nav hidden items-center justify-between md:flex">
      <ul className="hidden flex-wrap md:flex">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.path} className="px-5 capitalize text-black">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {mounted ? (
        <>
               <ActionIcon
      variant="text"
      onClick={()=> router.push("/cart")}

    >

                   <ShoppingCartIcon />
    </ActionIcon>
              
          {
          loading? 
          <Spin/> :
          isAuthorized ? (
            <div className="ml-7 flex justify-end">
              <ProfileMenu className="hidden md:block" />
            </div>
          ) : (
            <Button
              onClick={() =>            router.push(Routes.private.account)
              }
              className="ml-5 rounded-lg px-6 py-2 text-sm capitalize md:text-base 4xl:px-8 4xl:py-2.5  bg-primaryBg"
            >
                 Login
                  </Button>
          )}
           
        </>
      ) : null}
    </nav>
  );
}
