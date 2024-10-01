'use client';

import HeaderCell from '@/components/ui/table/header-cell';
import Badge from '@/components/ui/badge';
import { Order, OrderItem, OrderStatus, ShippingAddress } from '@/graphql/generated/schema';
import Button from '@/components/ui/button';
import { formatPriceNumber } from '@/utils/priceFormat';




export function getStatus(status: string) {
  if (status === OrderStatus.Done) {
    return 'success';
  }

  else {
    return 'warning';
  }

}

export const OrderReservationCol = (
order: string, column: string, // onChange: (row: any) => any,
onMore: (e: any, row: any) => any, openAddShippingModal: () => void, createPaymentSession: (productId: string, qty: number, orderId: string) => Promise<void>,
  // onHeaderClick: (value: string) => any
) => 
  
{ 
  
  
  return [


    {
      title: <HeaderCell title={'Items Pre-Price'} />,
      dataIndex: 'itemsPrePrice',
      width: 300,
      key: 'itemsPrePrice',

      render: (itemsPrePrice: number) => (
        <p className="whitespace-nowrap">{formatPriceNumber(itemsPrePrice)}</p>
      ),
    },
    {
      title: <HeaderCell title={'Items Total'} />,
      dataIndex: 'itemsPrice',
      width: 300,
      key: 'itemsPrice',

      render: (itemsPrice: number) => (
        <p className="whitespace-nowrap">{formatPriceNumber(itemsPrice)}</p>
      ),
    },
    {
      title: <HeaderCell title={'Products'} />,
      dataIndex: 'orderItem',
      width: 300,
      key: 'orderItem',

      render: (orderItem: OrderItem) => (
        <div className=' flex flex-col'>
       <Button>
        View
       </Button>
        </div>
      ),
    },
    {
      title: <HeaderCell title={'shipping Details'} />,
      dataIndex: 'shippingAddress',
      width: 300,
      key: 'shippingAddress',

      render: (shippingAddress: ShippingAddress) => (
        <div className=' flex flex-col w-full'>
        {
          !shippingAddress?.id? <Button onClick={openAddShippingModal}>
            Add
          </Button>:<Button>
            View
          </Button>
        }
        </div>
      ),
    },

    {
      title: <HeaderCell title={'Status'} />,
      dataIndex: '',
      width: 300,
      key: '',

      render: (data: Order) => {
        
        if (!data.status) return '__';
        return (
          // @ts-ignore
          <>

            <Badge variant="flat" className="uppercase" color={getStatus(data.status)}>
              {data.status}
            </Badge>
            {
              data.status === OrderStatus.PendingPrePayment && <Button className='my-5'>
                Pay Building Start Price
              </Button>
            }
            {
              data.status === OrderStatus.BuildCompleted && <Button onClick={()=>createPaymentSession(data.orderItem?.product.id??"", data.orderItem?.qty??1, data.id)} className='my-5'>
                Pay Now
              </Button>
            }

          </>
        );
      },
    },

    {
      title: <HeaderCell title={'CreatedAt'} />,
      dataIndex: 'createdAt',
      width: 300,
      key: 'createdAt',

      render: (date: any) => <p className="whitespace-nowrap">{new Date(date).toDateString()}</p>,

    },
    {
      title: <HeaderCell title={'Last Updated'} />,
      dataIndex: 'updatedAt',
      width: 300,
      key: 'updatedAt',

      render: (date: any) => <p className="whitespace-nowrap">{new Date(date).toDateString()}</p>,

    },
    {
      title: <HeaderCell title={'Shipping Price'} />,
      dataIndex: 'shippingPrice',
      width: 300,
      key: 'shippingPrice',

      render: (shippingPrice: number) => (
        <p className="whitespace-nowrap">{formatPriceNumber(shippingPrice)}</p>
      ),
    },

    {
      title: <HeaderCell title={'Tax'} />,
      dataIndex: 'taxPrice',
      width: 300,
      key: 'taxPrice',

      render: (taxPrice: number) => (
        <p className="whitespace-nowrap">{formatPriceNumber(taxPrice)}</p>
      ),
    },

    {
      title: <HeaderCell title={'Total price'} />,
      dataIndex: 'totalPrice',
      width: 300,
      key: 'totalPrice',

      render: (totalPrice: number) => (
        <p className="whitespace-nowrap">{formatPriceNumber(totalPrice)}</p>
      ),
    },

    {
      title: <HeaderCell title={'note'} />,
      dataIndex: 'note',
      width: 300,
      key: 'note',
      render: (note: string) => (
        <p className="whitespace-nowrap">{note}</p>
      ),
    },


  ]};
