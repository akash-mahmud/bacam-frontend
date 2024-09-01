'use client';

import DotsDropdown from '@/components/reservation/dots-dropdown';
import Checkbox from '@/components/ui/form-fields/checkbox';
import HeaderCell from '@/components/ui/table/header-cell';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import { BookingStatus } from '@/graphql/generated/schema';



export function getStatus(status: string) {
  if (status === BookingStatus.Active) {
    return 'success';
  }
  if (status === BookingStatus.Pending) {
    return 'warning';
  }
  if (status === BookingStatus.NotApproved) {
    return 'danger';
  }
}

export const BookingreservationColumn = (
  order: string,
  column: string,
  // onSelectAll: (key: boolean) => any,
  // onChange: (row: any) => any,
  onMore: (e: any, row: any) => any,
  // onHeaderClick: (value: string) => any
) => [
  // {
  //   title: (
  //     <HeaderCell
  //       title={
  //         <Checkbox
  //           variant="outline"
  //           inputClassName="!bg-white focus:!ring-0"
  //           onChange={(e) => onSelectAll(e.target.checked)}
  //           iconClassName="bg-gray-dark rounded cursor-pointer"
  //         />
  //       }
  //       className="lg:pl-5"
  //     />
  //   ),
  //   dataIndex: 'checked',
  //   key: 'checked',
  //   width: 50,
  //   render: (checked: boolean, row: any) => (
  //     <div className="inline-flex cursor-pointer lg:pl-5">
  //       <Checkbox
  //         variant="outline"
  //         checked={row.checked}
  //         onChange={() => onChange(row)}
  //         inputClassName="!bg-white focus:!ring-0"
  //         iconClassName="bg-gray-dark rounded cursor-pointer"
  //       />
  //     </div>
  //   ),
  // },
  // {
  //   title: (
  //     <HeaderCell
  //       title={'SL.'}
  //       sortable={true}
  //       ascending={order === 'asc' && column === 'id'}
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderClick('id'),
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 100,
  // },
  {
    title: <HeaderCell title={'Date'} />,
    dataIndex: 'bookingDate',
    key: 'bookingDate',
    width: 150,
    render: (bookingDate: any) => <p className="whitespace-nowrap">{new Date(bookingDate).toDateString()}</p>,
  },
  {
    title: <HeaderCell title={'Time'} />,
    dataIndex: 'bookingTime',
    key: 'bookingTime',
    width: 150,
    render: (bookingTime: any) => <p className="whitespace-nowrap">{new Date(bookingTime).toTimeString()}</p>,
  },
  {
    title: <HeaderCell title={'Status'} />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (status: string) => {
      if (!status) return '__';
      return (
        // @ts-ignore
        <Badge variant="flat" className="uppercase" color={getStatus(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    title: <HeaderCell title={'Company'} />,
    dataIndex: 'company',
    key: 'company',
    width: 200,
    render: (company: any) => (
      <div className="flex items-center gap-3">
        <Avatar src={company?.logo} size="40" name={company?.name}/>
        <p className="whitespace-nowrap">{company?.name}</p>
      </div>
    ),
  },
  {
    title: <HeaderCell title={'note'} />,
    dataIndex: 'note',
    key: 'note',
    width: 200,
    render: (note: string) => (
      <p className="whitespace-nowrap">{note}</p>
    ),
  },

  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    width: 50,
    render: (value: any, row: any) => (
      <div className="flex items-center gap-2">
        <DotsDropdown key={row.key} onClick={(e: any) => onMore(e, row)} />
      </div>
    ),
  },
];
