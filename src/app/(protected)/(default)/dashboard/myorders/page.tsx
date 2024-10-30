'use client';
import React from 'react';

import OrdersTable from '@/components/dashboard/orders/OrdersTable';
export default function page() {
  return (
    <>
      <div>
        <div>
          <OrdersTable />
        </div>
      </div>
    </>
  );
}
