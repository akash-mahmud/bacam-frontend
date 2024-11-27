'use client';

import Link from 'next/link';
import useAuth from '@/hooks/use-auth';
import { Routes } from '@/config/routes';

import { useIsMounted } from '@/hooks/use-is-mounted';

import { useRouter } from 'next/navigation';


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
    path: '/employee',
  },
  {
    id: 4,
    label: 'News',
    path: '/news',
  },
];

export default function Menu() {
  const { isAuthorized, loading } = useAuth();
  const mounted = useIsMounted();
  const router = useRouter();
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

    </nav>
  );
}
