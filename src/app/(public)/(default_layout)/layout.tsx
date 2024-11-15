import TransparentHeader from '@/components/header/transparent';
import React, { ReactNode } from 'react';
import MobileNav from '@/components/ui/mobile-nav';
import Footer from '@/components/footer/footer';
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TransparentHeader />
      {children}
      <Footer />
      <MobileNav />
    </>
  );
}
