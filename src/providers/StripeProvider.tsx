"use client"
import stripePromise from '@/utils/stripe';
import { Elements } from '@stripe/react-stripe-js';
import { FC } from 'react'

interface StripeElementProps {
  children:JSX.Element
}

const StripeProvider: FC<StripeElementProps> = ({children}) => {
    return <Elements options={{
      
    }}  stripe={stripePromise}>{children}</Elements>;
}

export default StripeProvider