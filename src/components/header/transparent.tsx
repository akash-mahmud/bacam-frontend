'use client';

import { useRef } from 'react';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import SearchIconBtn from '@/components/ui/search-icon-btn';
import Menu from '@/components/header/menu';
import Logo from '@/components/ui/logo';
import useAuth from '@/hooks/use-auth';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Spin } from 'antd';
import ProfileMenu from './profile-menu';
import Button from '../ui/button';
import { useModal } from '../modals/context';

import { useEffect } from 'react';

import { Badge } from 'antd';
import { Routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ActionIcon from '../ui/action-icon';
import {
  fetchCartItemCount,
  fetchCartOfTheUser,
} from '@/store/slices/product/cart';
import { useAppDispatch, useAppSelector } from '@/store';
export default function TransparentHeader() {
  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  const { isAuthorized, loading } = useAuth();
  const mounted = useIsMounted();
  const { openModal } = useModal();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cartItemCount, status, error, cart } = useAppSelector(
    (state) => state.cart,
  );

  // Fetch cart item count on component mount
  useEffect(() => {
    dispatch(fetchCartOfTheUser());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.id) {
      dispatch(fetchCartItemCount());
    }
  }, [dispatch, cart?.id]);
  return (
    <header
      // ref={headerRef}
      className=" sticky bg-white shadow-md top-0 left-0 z-[100] flex w-full justify-between   px-4 py-2.5  sm:px-6 lg:py-3 2xl:px-7 3xl:px-8 4xl:py-6 4xl:px-16"
    >
      <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
        <Logo className="!text-gray-dark" />
      </div>
      <div className="flex items-center ">
        <Menu />
        <div className=" hidden md:flex items-center justify-end gap-5">
          {mounted ? (
            <>

              <Badge color="#dd3780" count={cartItemCount} showZero>
                {' '}
                <ActionIcon variant="text" onClick={() => router.push('/cart')}>
                  <ShoppingCartIcon />
                </ActionIcon>
              </Badge>
              <SearchIconBtn className=" " />

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
          ) :           <SearchIconBtn className=" " />
}
        </div>
      </div>
    </header>
  );
}
