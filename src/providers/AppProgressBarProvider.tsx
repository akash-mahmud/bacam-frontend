'use client';

import { AppProgressBar  } from 'next-nprogress-bar';
import { ReactNode } from 'react';

export default function AppProgressBarProvider({ children }:{ children:ReactNode }) {
  return (
<>
{ children }

<AppProgressBar
          height="2px"
          color="#433f92"
          options={{ showSpinner: false }}
          
        />
</>
  )
}
