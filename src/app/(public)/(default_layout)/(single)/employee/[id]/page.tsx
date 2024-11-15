'use client';
import { TopBikes } from '@/components/home/top-bikes';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import Section from '@/components/ui/section';
import SeeMore from '@/components/ui/see-more';
import {
  Product,
  SortOrder,
  useEmployeeQuery,
  useProductsLazyQuery,
  useProductsQuery,
} from '@/graphql/generated/schema';
import { getImage } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const params: { id: string } = useParams() as any;
  const { data } = useEmployeeQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
  });
  const employee = data?.employee;
  const { data: productData, loading } = useProductsQuery({
    variables: {
      take: 8,
      where: {
        employeeId: {
          equals: params?.id,
        },
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const products = productData?.products ?? [];

  return (
    <div className=" flex flex-col">
      <div className="w-full rounded border p-5 text-center text-gray-500 shadow">
        <Image
          height={128}
          width={128}
          className="mx-auto rounded-full"
          src={getImage(employee?.image ?? '') ?? ''}
          alt=""
        />
        <div className="mt-5 text-sm">
          <a
            href="#"
            className="font-medium leading-none text-gray-900 transition duration-500 ease-in-out hover:text-indigo-600"
          >
            {employee?.name}
          </a>
          <p>{employee?.employeeSubCategory?.name}</p>
        </div>

        <p className="mb-5 mt-2 text-sm text-gray-900">
          {employee?.shortDescription}
        </p>
        <div className="mx-8 mt-2 border-t p-4">
          <Link
            href={`/product?employee=${params.id}`}
            className=" mx-auto block w-1/6 rounded-full bg-gray-900 px-6 py-2 font-semibold text-white hover:shadow-lg"
          >
            Order
          </Link>
        </div>
      </div>
      <Section
        className="group/section  my-5 mt-5 overflow-hidden lg:mt-8"
        headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
        rightElement={<SeeMore />}
      >
        {loading && <ListingCardLoader />}
        {!loading && (
          <TopBikes
            // @ts-ignore
            title=""
            description=""
            employeeId={params.id}
            products={products as Product[]}
          />
        )}
      </Section>
    </div>
  );
}
