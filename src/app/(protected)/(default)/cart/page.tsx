"use client"
import { CloseIcon } from '@/components/icons/close-icon';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { ProductPaymentTypes, ProductType, useCartItemsQuery, useCreateCheckoutSessionMutation, useDeleteOneCartItemMutation } from '@/graphql/generated/schema';
import { useAppDispatch } from '@/store';
import { fetchCartItemCount } from '@/store/slices/product/cart';
import { getImage } from '@/utils/getImage';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useStripe } from '@stripe/react-stripe-js';
import { notification, Table } from 'antd';
import React from 'react'
export const CartData =[]
export default function CartPage() {

  const {data, loading, refetch} = useCartItemsQuery()
  const [DeletCartItem , {loading:DeleteLoading}] = useDeleteOneCartItemMutation()
  const [CreateSession , {loading:CreateSessionLoading}] = useCreateCheckoutSessionMutation()
const stripe = useStripe();


const items = data?.cartItems??[]

const dipatch = useAppDispatch()  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'product',
      key: 'product',
      render:({name})=> <span>{name}</span>

    },
    {
      title: 'Image',
      dataIndex: 'product',
      key: 'product',
      render:(product)=> <Avatar size='45' src={getImage(product.images[0])}/>
    },
    {
      title: 'Price',
    
render:(data)=><span>${data.product.price *data.quantity}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Per piece price',
      dataIndex: 'product',
      key: 'product',
      render:({price})=><span>${price}</span> 
    },
    {
      title: 'Order Starting price',
      dataIndex: 'product',
      key: 'product',
      render:({orderStartPrice})=>orderStartPrice&&<span>${orderStartPrice}</span> 
    },
    {
      title: 'Action',

      render:(data)=><div className=' flex flex-row justify-around'>
<Button onClick={()=> checkoutCustomProduct( data.product?.id, data.quantity)}  className=' bg-neutral-800 hover:!bg-neutral-900'>
  Checkout
</Button>
<Button onClick={async()=> {
  await DeletCartItem({
    variables:{
      where:{
        id:data.id
      }
    }
  })
  await refetch()
await dipatch(fetchCartItemCount())
}}  className='p-2 bg-red-600 hover:!bg-red-700'>
<CloseIcon className=' h-5 w-5' color='white'/>
</Button>

      </div>
    },
  ];
const checkoutAllReadyProducts = async () => {
  const productIds = items.filter((elem)=> elem.product.type === ProductType.ReadyMate ).map((itm)=> itm.product.id)
  if (productIds.length>0) {
    
    const {data} = await CreateSession({
      variables:{
        input:{
          paymentType:ProductPaymentTypes.OneTimePayment,
          productIds:productIds,
        }
      }
    })
  
    if (data?.createCheckoutSession?.id) {
      stripe?.redirectToCheckout({ sessionId: data?.createCheckoutSession?.id });
  
    }
  }else{
    notification.error({
      message:"No readymate product in your cart."
    })
  }
}

const checkoutCustomProduct = async (id:string ,qty:number ) => {
  if (id) {
    
    const {data} = await CreateSession({
      variables:{
        input:{
          paymentType:ProductPaymentTypes.OrderStartPrice,
          productIds:[id],
          quantity:qty
        }
      }
    })
  
    if (data?.createCheckoutSession?.id) {
      stripe?.redirectToCheckout({ sessionId: data?.createCheckoutSession?.id });
  
    }
  }
}
  return (
   <div className="container relative bg-white border mt-5 rounded shadow">
<div className='p-5'>
  <div className=' flex justify-end'>

  <Button  className=' bg-neutral-800 hover:!bg-neutral-900' onClick={checkoutAllReadyProducts}>
  Checkout All ready products
</Button>
  </div>
<div>

<Table  className=' m-5 ' dataSource={items} columns={columns} pagination={false}/>
</div>
</div>

   </div>
  )
}
