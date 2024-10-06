'use client';

import { useRef } from 'react';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import SearchIconBtn from '@/components/ui/search-icon-btn';
import Menu from '@/components/header/menu';
import Logo from '@/components/ui/logo';
import SideNavButton from '../ui/side-nav-button';
import useAuth from '@/hooks/use-auth';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Spin } from 'antd';
import ProfileMenu from './profile-menu';
import Button from '../ui/button';
import { useModal } from '../modals/context';

export default function TransparentHeader() {
  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  const { isAuthorized , loading } = useAuth();
  const mounted = useIsMounted();
  const { openModal } = useModal();

  return (
    <header
      // ref={headerRef}
      className=" sticky bg-white shadow-md top-0 left-0 z-[100] flex w-full justify-between   px-4 py-2.5  sm:px-6 lg:py-3 2xl:px-7 3xl:px-8 4xl:py-6 4xl:px-16"
    >
    <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
          <Logo className="!text-gray-dark" />
        </div>
      <div className="flex items-center ">
        <SearchIconBtn className="md:hidden" />
   
        <Menu />
      </div>
    </header>
  );
}
