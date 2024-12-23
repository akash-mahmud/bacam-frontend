'use client';
import useAuth from '@/hooks/use-auth';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Spin } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { loading, isAuthorized } = useAuth();
  const mounted = useIsMounted();
  const path = usePathname();
  useEffect(() => {
    if (!isAuthorized && !loading) {
      router.push(`/sign-in?redirectTo=${path}`);
    }
  }, [isAuthorized, loading]);

  if (loading) {
    return <Spin />;
  }

  return <>{mounted && isAuthorized ? children : null}</>;
}
