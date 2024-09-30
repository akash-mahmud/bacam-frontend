import clsx from 'clsx';
import type { Metadata } from 'next';
import { Satisfy, Lato } from 'next/font/google';
import '@/styles/globals.css';
import GalleryCarouselView from '@/components/gallery/view';
import DrawerContainer from '@/components/drawers/view';
import ModalContainer from '@/components/modals/view';
import ReduxStoreProvider from '@/store/provider'
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-multi-carousel/lib/styles.css';

import ClientProviders from '@/providers/ClientProviders';
import StyledComponentsRegistry from '@/providers/StyledComponentsRegistry';
import Head from 'next/head';
import PublicApolloClient from '@/providers/PublicApolloClient';
import StripeProvider from '@/providers/StripeProvider';
import AppProgressBarProvider from '@/providers/AppProgressBarProvider';
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
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    // <ThemeProvider theme={theme}>
    // <GlobalStyles /> 
    <html
      lang="en"
      className={clsx(
        'h-full font-lato antialiased',
        satisfy.variable,
        lato.variable
      )}
    >
    <Head>
    <meta name="application-name" content="PWA App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="PWA App" />
<meta name="description" content="Best PWA App in the world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://yourdomain.com" />
<meta name="twitter:title" content="PWA App" />
<meta name="twitter:description" content="Best PWA App in the world" />
<meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
<meta name="twitter:creator" content="@DavidWShadow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="PWA App" />
<meta property="og:url" content="https://yourdomain.com" />
<meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
    </Head>
      
      <ClientProviders>
        <AppProgressBarProvider>

    <StripeProvider>
      <PublicApolloClient>

      <StyledComponentsRegistry>

      <ReduxStoreProvider>

      <body className="flex min-h-full flex-col">
        {children}
        <ModalContainer />
        <DrawerContainer />
        <GalleryCarouselView />
      </body>
      </ReduxStoreProvider>
      </StyledComponentsRegistry>
      </PublicApolloClient>

    </StripeProvider>
        </AppProgressBarProvider>
      </ClientProviders>
    </html>
    // </ThemeProvider>
  );
}
