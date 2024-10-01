'use client'
import React, { ReactNode } from 'react'
import GlobalStyles from '@/themes/global.style';
import theme from '@/themes/default.theme';
import { ThemeProvider } from 'styled-components';

export default function ClientProviders({children}:{children:ReactNode}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
      </ThemeProvider>
  )
}
