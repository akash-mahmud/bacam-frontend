'use client';

import { reservationData } from 'public/data/orders';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { reservationColumn } from '@/components/reservation/reservation-col';
import Input from '@/components/ui/form-fields/input';
import Pagination from '@/components/ui/pagination';
import Text from '@/components/ui/typography/text';
import Table from '@/components/ui/table';
import { BookingreservationColumn } from './Bookingreservation-col';
import { useBookingsQuery } from '@/graphql/generated/schema';
import useAuth from '@/hooks/use-auth';

export default function BookingTable() {
  const [order, setOrder] = useState<string>('desc');
  const [column, setColumn] = useState<string>('');
  const {user} = useAuth()
  const {data} = useBookingsQuery({
 variables:{
  where:{
    userId: {
      equals: user?.id
    }
  }
 }
  })
//   const [data, setData] = useState<typeof reservationData>([]);
  const [searchfilter, setSearchFilter] = useState('');
  const [current, setCurrent] = useState(1);

  // filter data in table
//   useEffect(() => {
//     let fArr = [...data];
//     if (searchfilter) {
//       setData(
//         fArr.filter((item) =>
//           item.customer.name.toLowerCase().includes(searchfilter.toLowerCase())
//         )
//       );
//     } else {
//       let start = (current - 1) * 10;
//       let offset = current * 10;
//       const getData = () => reservationData?.slice(start, offset);
//       setData(getData());
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchfilter]);

//   // table current change
//   useEffect(() => {
//     let start = (current - 1) * 10;
//     let offset = current * 10;
//     const getData = () => reservationData?.slice(start, offset);
//     setData(getData());
//   }, [current]);

  // select all checkbox function
//   const onSelectAll = useCallback(
//     (checked: boolean) => {
//       let fArr = [...data];
//       let cArr: any = [];
//       if (checked) {
//         fArr.forEach((item) => {
//           item.checked = true;
//           cArr.push(item);
//         });
//         setData(cArr);
//       } else {
//         fArr.forEach((item) => {
//           item.checked = false;
//           cArr.push(item);
//         });
//         setData(fArr);
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     },
//     [data]
//   );

  // single select checkbox function
//   const onChange = useCallback(
//     (row: any) => {
//       let fArr = [...data];
//       let cArr: any = [];
//       fArr.forEach((item) => {
//         if (item.id === row.id) item.checked = !item.checked;
//         cArr.push(item);
//       });
//       setData(cArr);
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     },
//     [data]
//   );

  // handle more button with edit, preview, delete
  const onMore = useCallback((e: any, row: any) => {
    console.log(e.target.id);
  }, []);

  // on header click sort table by ascending or descending order
//   const onHeaderClick = useCallback(
//     (value: string) => ({
//       onClick: () => {
//         setColumn(value);
//         setOrder(order === 'desc' ? 'asc' : 'desc');
//         if (order === 'desc') {
//           //@ts-ignore
//           setData([...data.sort((a, b) => (a[value] > b[value] ? -1 : 1))]);
//         } else {
//           //@ts-ignore
//           setData([...data.sort((a, b) => (a[value] > b[value] ? 1 : -1))]);
//         }
//       },
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [data]
//   );

  // gets the columns of table
  const columns: any = useMemo(
    () =>
        BookingreservationColumn(
        order,
        column,
        // onSelectAll,
        // onChange,
        onMore,
        // onHeaderClick
      ),
    [order, column, 
        // onSelectAll,
        //  onChange,
          onMore,
        //  onHeaderClick
        ]
  );

  return (
    <>
      <div className="mb-4 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_262px] md:gap-5 xl:gap-10">
        <Text tag="h4" className="text-xl">
          Your bookings
        </Text>
     
      </div>
      <Table
        data={data?.bookings??[]}
        columns={columns}
        variant="minimal"
        className="text-sm"
      />
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
    </>
  );
}
