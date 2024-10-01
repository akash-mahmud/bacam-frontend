'use client';


import { Product, ProductPaymentTypes, useAggregateOrderItemQuery, useCreateCheckoutSessionMutation , } from '@/graphql/generated/schema';
import { getImage } from '@/utils/getImage';
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import ImageMagnifier from '../ImageMagnifier';
import ActionIcon from '../action-icon';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from '../button';
import AuthRequiredButton from '@/components/auth/AuthRequiredButton';
import { useStripe } from '@stripe/react-stripe-js';
import { Flex, Progress, Spin, Tooltip } from 'antd';
import { formatPriceNumber } from '@/utils/priceFormat';
export default function VendorProfileCard({ product }: {
  product?: Product
}) {
const [qty, setqty] = useState(1)
const [CreateSession , {loading}] = useCreateCheckoutSessionMutation()
const stripe = useStripe();

const createPaymentSession = async () => {
  if (product?.id) {
    
    const {data} = await CreateSession({
      variables:{
        input:{
          paymentType:ProductPaymentTypes.OrderStartPrice,
          productIds:[product?.id],
          quantity:qty
        }
      }
    })
  
    if (data?.createCheckoutSession?.id) {
      stripe?.redirectToCheckout({ sessionId: data?.createCheckoutSession?.id });
  
    }
  }
  
}

const {data} = useAggregateOrderItemQuery()
const ordersForThisProductCount = data?.aggregateOrderItem?._sum?.qty??0
const percentage = ordersForThisProductCount>0?(ordersForThisProductCount/(product?.minimumOrderNeededToStart??1)*100):0

  return (
    <div className="relative flex flex-col md:flex-row justify-center px-4  text-center md:mt-8  md:justify-between md:overflow-hidden md:rounded-lg md:px-0   2xl:mt-12 ">


      <div className="relative w-full md:w-[60%] overflow-hidden rounded-xl mx-3 ">
<div>
  <h1 className=' text-left font-medium text-4xl'>
    {product?.name}
  </h1>
</div>
<div className=''>

        <ImageGallery showNav={true} 
        renderLeftNav={(onclick)=>       <ActionIcon onClick={onclick}
                rounded="full"
                color="light" 
                size="xl"
           className=' absolute z-50 left-5  inset-y-0 my-auto mx-0'
              >
                <ChevronLeftIcon className="-ml-0.5 " />
              </ActionIcon>}
               renderRightNav={(onclick)=>       <ActionIcon onClick={onclick}
               rounded="full"
               color="light"
               size="xl"
          className=' absolute z-50 right-5  inset-y-0 my-auto mx-0'
             >
                <ChevronRightIcon className="-mr-0.5 " />
                </ActionIcon>}
              showFullscreenButton={false} showPlayButton={false} items={product?.images.map((img) => ({
          thumbnail: getImage(img) ?? "",
          original: getImage(img) ?? "",
          // renderItem: ((item: ReactImageGalleryItem) =>


          //   <ImageMagnifier src={item.original} imageClasses='image-gallery-image'


          //   />

          // )

        })) ?? []
        } />
</div>
      </div>

      <div className="z-10 mt-20 flex h-auto w-full md:w-[40%] flex-col  rounded-lg bg-white p-8 border shadow-lg   md:mt-0 md:h-full  
      
      ">
  <div className="flex flex-col justify-start items-start">
<div>
  <h3 className=' text-3xl text-left'>
 
  {formatPriceNumber( product?.price)}

  </h3>
</div>
<div>
<label htmlFor="quantity-input" className="block my-2 font-bold text-left text-gray-900 dark:text-white">Quantity:</label>
    <div className="relative flex items-center max-w-[8rem]">
        <button onClick={()=> setqty((prev)=> prev>1? prev-1 : prev)} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        </button>
        <input type="number" value={qty} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" onChange={(event)=> setqty(parseInt(event.target.value))} />
        <button onClick={()=> setqty((prev)=> prev+1)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
</div>
<div className='my-3 flex flex-col '>
  <label>Project starting minimum order progress</label>
  <Tooltip title={`${ordersForThisProductCount}/${product?.minimumOrderNeededToStart}`}>

<Progress  percent={percentage} 
/>
</Tooltip>
</div>

<div className=' flex flex-col my-5 w-full'>

<Button  variant='outline' className=' my-3 py-4 rounded-md '>
  Add to Cart
</Button>
<AuthRequiredButton>
<Spin spinning={loading} className=' w-full'>


<Button type='button'  className=' my-3 py-4 rounded-md w-full ' onClick={async()=>{
await createPaymentSession()  
} }>
Buy now with one click
</Button>
</Spin>
</AuthRequiredButton>
</div>
  </div>
      </div>
    </div>
  );
}

