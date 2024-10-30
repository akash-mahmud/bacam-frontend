import clsx from 'clsx';
import type { Metadata } from 'next';
import { Satisfy, Lato } from 'next/font/google';
import '@/styles/globals.css';
import GalleryCarouselView from '@/components/gallery/view';
import DrawerContainer from '@/components/drawers/view';
import ModalContainer from '@/components/modals/view';
import ReduxStoreProvider from '@/store/provider';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-multi-carousel/lib/styles.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import ClientProviders from '@/providers/ClientProviders';
// import StyledComponentsRegistry from '@/providers/StyledComponentsRegistry';
import PublicApolloClient from '@/providers/PublicApolloClient';
import StripeProvider from '@/providers/StripeProvider';
import AppProgressBarProvider from '@/providers/AppProgressBarProvider';
import StyledComponentsRegistry from '@/providers/StyledComponentsRegistry';
import { theme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { Suspense } from 'react';
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
});

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-satisfy',
});

export const metadata: Metadata = {
  title: 'Boat Rental',
  description: 'Find your boat with the best experience.',
  icons: ['/images/logo.svg'],
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    // <ThemeProvider theme={theme}>
    // <GlobalStyles />
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx('antialiased', satisfy.variable, lato.variable)}
        suppressHydrationWarning
      >
        <ClientProviders>
          <Suspense fallback={<></>}>
            <AppProgressBarProvider>
              <StripeProvider>
                <PublicApolloClient>
                  <StyledComponentsRegistry>
                    <ReduxStoreProvider>
                      <AntdRegistry>
                        <main className="flex flex-col min-h-screen">
                          {children}
                        </main>
                        <ModalContainer />
                        <DrawerContainer />
                        <GalleryCarouselView />
                      </AntdRegistry>
                    </ReduxStoreProvider>
                  </StyledComponentsRegistry>
                </PublicApolloClient>
              </StripeProvider>
            </AppProgressBarProvider>
          </Suspense>
        </ClientProviders>
      </body>
    </html>
    //  </ThemeProvider>
  );
}
