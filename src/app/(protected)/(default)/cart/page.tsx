"use client"
import { CloseIcon } from '@/components/icons/close-icon';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { Table } from 'antd';
import React from 'react'
export const CartData =[{
  "id": "95KMqiiQ1S",
  "name": "Off-Road Overlord",
  "description": "Sensory problem w head",
  "price": 5864,
  "images": "http://dummyimage.com/138x100.png/cc0000/ffffff",
  "quantity": 4
}, {
  "id": "GUz1X44844",
  "name": "Pedal Pioneer",
  "description": "Ventricular shunt status",
  "price": 665,
  "images": "http://dummyimage.com/188x100.png/5fa2dd/ffffff",
  "quantity": 6
}, {
  "id": "Ybim1f7o4m",
  "name": "Street Speedster",
  "description": "Pelvic organ inj NOS-opn",
  "price": 1793,
  "images": "http://dummyimage.com/222x100.png/ff4444/ffffff",
  "orderStartPrice": 6856,
  "quantity": 7
}, {
  "id": "zo36uFrcQi",
  "name": "Road Racer",
  "description": "Gangrene",
  "price": 2222,
  "images": "http://dummyimage.com/221x100.png/ff4444/ffffff",
  "orderStartPrice": 33,
  "quantity": 2
}, {
  "id": "F7f9sk8age",
  "name": "Ride Ruler",
  "description": "Eye anomalies NEC",
  "price": 4320,
  "images": "http://dummyimage.com/170x100.png/5fa2dd/ffffff",
  "orderStartPrice": 9353,
  "quantity": 1
}, {
  "id": "VM7uAQzh2c",
  "name": "Bike Blaster",
  "description": "Mansonella ozzardi infec",
  "price": 3020,
  "images": "http://dummyimage.com/129x100.png/5fa2dd/ffffff",
  "orderStartPrice": 9746,
  "quantity": 6
}, {
  "id": "daLH37YjL3",
  "name": "Mountain Maverick",
  "description": "Unsocial aggress-severe",
  "price": 4069,
  "images": "http://dummyimage.com/190x100.png/ff4444/ffffff",
  "quantity": 5
}, {
  "id": "U3I4iS1F6M",
  "name": "Bike Blaster",
  "description": "Int infec campylobacter",
  "price": 6478,
  "images": "http://dummyimage.com/125x100.png/5fa2dd/ffffff",
  "orderStartPrice": 2242,
  "quantity": 4
}, {
  "id": "9bD9hkk5gb",
  "name": "Speedy Cyclist",
  "description": "One eye-severe/oth-NOS",
  "price": 6489,
  "images": "http://dummyimage.com/247x100.png/5fa2dd/ffffff",
  "quantity": 6
}, {
  "id": "M31ms7pAT3",
  "name": "Wheel Wizard",
  "description": "Cerebvas dis-deliv w p/p",
  "price": 8385,
  "images": "http://dummyimage.com/241x100.png/5fa2dd/ffffff",
  "orderStartPrice": 8421,
  "quantity": 3
}, {
  "id": "ZDM5251nC0",
  "name": "City Cyclist",
  "description": "Rheum fev w/o hrt involv",
  "price": 9820,
  "images": "http://dummyimage.com/233x100.png/ff4444/ffffff",
  "orderStartPrice": 5397,
  "quantity": 3
}, {
  "id": "zPO50we6D6",
  "name": "Street Stomper",
  "description": "Adv eff sympathomimetics",
  "price": 914,
  "images": "http://dummyimage.com/220x100.png/cc0000/ffffff",
  "quantity": 2
}, {
  "id": "2ssy3uF3ca",
  "name": "Street Speedster",
  "description": "Inf arthritis NEC-mult",
  "price": 9020,
  "images": "http://dummyimage.com/236x100.png/cc0000/ffffff",
  "quantity": 7
}, {
  "id": "5TRzsL93cX",
  "name": "Road Racer",
  "description": "Chr erythrm w remision",
  "price": 8456,
  "images": "http://dummyimage.com/137x100.png/ff4444/ffffff",
  "orderStartPrice": 4618,
  "quantity": 3
}, {
  "id": "5P9Yo69z7z",
  "name": "Mountain Crusher",
  "description": "Open wound scalp-compl",
  "price": 4874,
  "images": "http://dummyimage.com/166x100.png/cc0000/ffffff",
  "quantity": 3
}, {
  "id": "IRgekt90BK",
  "name": "Ride Master",
  "description": "Dermatomycoses NEC",
  "price": 3513,
  "images": "http://dummyimage.com/235x100.png/5fa2dd/ffffff",
  "quantity": 2
}, {
  "id": "fczqn72SWo",
  "name": "Ride Master",
  "description": "1st deg burn axilla",
  "price": 2560,
  "images": "http://dummyimage.com/172x100.png/ff4444/ffffff",
  "quantity": 3
}, {
  "id": "fgBkBAt1G6",
  "name": "Bike Boss",
  "description": "Endothel cornea dystrphy",
  "price": 1833,
  "images": "http://dummyimage.com/158x100.png/dddddd/000000",
  "orderStartPrice": 3378,
  "quantity": 7
}, {
  "id": "LaC12ZXwjR",
  "name": "Bike Beast",
  "description": "Poison-rabies vaccine",
  "price": 6898,
  "images": "http://dummyimage.com/131x100.png/cc0000/ffffff",
  "orderStartPrice": 8144,
  "quantity": 1
}, {
  "id": "I6BvugjNOD",
  "name": "Trailblazing Titan",
  "description": "Adv eff uric acid metab",
  "price": 4164,
  "images": "http://dummyimage.com/186x100.png/ff4444/ffffff",
  "orderStartPrice": 7052,
  "quantity": 5
}]
export default function CartPage() {
  const dataSource = CartData
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render:(url)=> <Avatar size='45' src={url}/>
    },
    {
      title: 'Price',
render:(product)=><span>${product.price *product.quantity}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Per piece price',
      dataIndex: 'price',
      key: 'price',
      render:(price)=><span>${price}</span> 
    },
    {
      title: 'Order Starting price',
      dataIndex: 'orderStartPrice',
      key: 'orderStartPrice',
      render:(orderStartPrice)=>orderStartPrice&&<span>${orderStartPrice}</span> 
    },
    {
      title: 'Action',

      render:(product)=><div className=' flex flex-row justify-around'>
<Button  className=' bg-neutral-800 hover:!bg-neutral-900'>
  Checkout
</Button>
<Button  className='p-2 bg-red-600 hover:!bg-red-700'>
<CloseIcon className=' h-5 w-5' color='white'/>
</Button>

      </div>
    },
  ];


  return (
   <div className="container relative bg-white border mt-5 rounded shadow">
<div className='p-5'>
  <div className=' flex justify-end'>

  <Button  className=' bg-neutral-800 hover:!bg-neutral-900'>
  Checkout All ready products
</Button>
  </div>
<div>

<Table  className=' m-5 ' dataSource={dataSource} columns={columns} pagination={false}/>
</div>
</div>

   </div>
  )
}
