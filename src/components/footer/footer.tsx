'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Routes } from '@/config/routes';

const menuItems = [
  {
    label: 'Home',
    path: Routes.public.home,
  },
  {
    label: 'Explore',
    path: Routes.public.explore,
  },
  {
    label: 'Pricing',
    path: Routes.public.pricing,
  },
  {
    label: 'Help',
    path: Routes.public.help,
  },
];

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className=" bg-footerBg text-white">
      <div className={clsx('container-fluid mb-4', className)}>
        <div className=" flex flex-col md:mb-6 md:flex-row md:items-center md:justify-between md:t md:t-gray-lighter md:pt-6 lg:mb-8 lg:pt-8">
          <div className="order-2 pt-4 md:order-none md:pt-0 lg:shrink-0">
            <p className="text-center text-sm font-normal capitalize leading-6 md:text-left 3xl:text-base">
              Copyright &copy; {new Date().getFullYear()} <b>Art booking</b> All
              rights reserved
            </p>
          </div>
          <nav className="order-1 b gray-lighter pb-4 md:order-none md:b-0 md:pb-0">
            <ul className="flex flex-wrap items-center justify-center md:justify-end">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className="px-4 first:pl-0 last:pr-0 lg:px-6"
                >
                  <Link
                    href={item.path}
                    className="block text-sm font-normal capitalize leading-4 text-primary 3xl:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
