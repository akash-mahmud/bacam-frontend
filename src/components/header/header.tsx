'use client';

import { useRef } from 'react';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import SearchIconBtn from '@/components/ui/search-icon-btn';
import SideNavButton from '@/components/ui/side-nav-button';
import ProfileMenu from '@/components/header/profile-menu';
import { useModal } from '@/components/modals/context';
import Searchbox from '@/components/ui/search-box';
import Button from '@/components/ui/button';
import Logo from '@/components/ui/homelogo';
import useAuth from '@/hooks/use-auth';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Spin } from 'antd';
import { Routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ActionIcon from '../ui/action-icon';

export default function Header() {
  const mounted = useIsMounted();
  const { openModal } = useModal();
  const { isAuthorized, loading } = useAuth();
  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  const router = useRouter();
  return (
    <header
      // ref={headerRef}
      className="dashboard-header is-scrolling sticky top-0 z-30 flex h-16 w-full bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24"
    >
      <div className="container-fluid grid w-full grid-cols-2 items-center gap-0 lg:grid-cols-3">
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
          <SideNavButton />
          <Logo className="!text-gray-dark" />
        </div>
        <Searchbox className="hidden lg:block" />
        <div className="flex items-center justify-end gap-5">
          <SearchIconBtn />
          {mounted ? (
            <>
              <ActionIcon variant="text" onClick={() => router.push('/cart')}>
                <ShoppingCartIcon />
              </ActionIcon>

              {loading ? (
                <Spin />
              ) : isAuthorized ? (
                <div className="ml-7 flex justify-end">
                  <ProfileMenu className="hidden md:block" />
                </div>
              ) : (
                <Button
                  onClick={() => router.push(Routes.private.account)}
                  className="ml-5 rounded-lg px-6 py-2 text-sm capitalize md:text-base 4xl:px-8 4xl:py-2.5  bg-primaryBg"
                >
                  Login
                </Button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
