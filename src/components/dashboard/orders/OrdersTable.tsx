'use client';

import { reservationData } from 'public/data/orders';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { reservationColumn } from '@/components/reservation/reservation-col';
import Input from '@/components/ui/form-fields/input';
import Pagination from '@/components/ui/pagination';
import Text from '@/components/ui/typography/text';
import Table from '@/components/ui/table';
import useAuth from '@/hooks/use-auth';
import {
  ProductPaymentTypes,
  useCreateCheckoutSessionMutation,
  useMyOrdersQuery,
} from '@/graphql/generated/schema';
import { OrderReservationCol } from './OrderReservationCol';
import { Modal, Spin } from 'antd';
import { useStripe } from '@stripe/react-stripe-js';

export default function OrdersTable() {
  const [order, setOrder] = useState<string>('desc');
  const [column, setColumn] = useState<string>('');
  const { user } = useAuth();
  const [CreateSession, { loading }] = useCreateCheckoutSessionMutation();
  const stripe = useStripe();

  const createPaymentSession = async (
    productId: string,
    qty: number,
    orderId: string,
  ) => {
    const { data } = await CreateSession({
      variables: {
        input: {
          paymentType: ProductPaymentTypes.Totalprice,
          productIds: [productId],
          quantity: qty,
          orderId: orderId,
        },
      },
    });

    if (data?.createCheckoutSession?.id) {
      stripe?.redirectToCheckout({
        sessionId: data?.createCheckoutSession?.id,
      });
    }
  };
  const { data } = useMyOrdersQuery({
    variables: {},
  });
  console.log(data);

  const [addShippingModal, setaddShippingModal] = useState(false);
  const openAddShippingModal = () => {
    setaddShippingModal(true);
  };
  const closeAddShippingModal = () => {
    setaddShippingModal(false);
  };
  const [searchfilter, setSearchFilter] = useState('');
  const [current, setCurrent] = useState(1);

  const onMore = useCallback((e: any, row: any) => {
    console.log(e.target.id);
  }, []);

  const columns: any = useMemo(
    () =>
      OrderReservationCol(
        order,
        column,
        // onSelectAll,
        // onChange,
        onMore,
        // onHeaderClick
        openAddShippingModal,
        createPaymentSession,
      ),
    [
      order,
      column,
      // onSelectAll,
      //  onChange,
      onMore,
      openAddShippingModal,
      createPaymentSession,
      //  onHeaderClick
    ],
  );

  return (
    <>
      <div className="mb-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_262px] md:gap-5 xl:gap-10">
        <Text tag="h4" className="text-xl">
          Your Orders
        </Text>
      </div>
      <Spin spinning={loading}>
        <Table
          data={data?.myOrders ?? []}
          columns={columns}
          variant="modern"
          className="text-sm w-[80vw] "
        />
      </Spin>
      {/* <div className="mt-8 text-center">
        <Pagination
          current={current}
          total={reservationData.length}
          pageSize={10}
          nextIcon="Next"
          prevIcon="Previous"
          variant="solid"
          prevIconClassName="!text-gray-dark"
          nextIconClassName="!text-gray-dark"
          onChange={(page) => {
            setCurrent(page);
          }}
        />
      </div> */}
      <Modal
        footer={<></>}
        onCancel={closeAddShippingModal}
        open={addShippingModal}
      ></Modal>
    </>
  );
}
