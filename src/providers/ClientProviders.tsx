'use client'
import React from 'react'
import GlobalStyles from '@/themes/global.style';
import theme from '@/themes/default.theme';
import { ThemeProvider } from 'styled-components';

export default function ClientProviders({children}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
      </ThemeProvider>
  )
}
