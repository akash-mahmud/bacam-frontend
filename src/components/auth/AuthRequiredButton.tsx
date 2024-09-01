'use client'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation';
import React, { cloneElement, ReactElement } from 'react'

export default function AuthRequiredButton({children}:{children:ReactElement}) {
    const {isAuthorized} = useAuth()
    const router = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isAuthorized) {
          // If the button has an onClick function, call it
          if (children.props.onClick) {
            children.props.onClick(event);
          }
        } else {
          // If not authenticated, redirect to the auth page
          router.push('/sign-in');
        }
      };
      const childWithProps = cloneElement(children, {
        onClick: handleClick,
      });
    
  return (
<>
{childWithProps}
</>  )
}
