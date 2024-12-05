'use client';
import { TopBikes } from '@/components/home/top-bikes';
import PreviousWorkCard from '@/components/ui/cards/PreviousWorkCard';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import Section from '@/components/ui/section';
import SeeMore from '@/components/ui/see-more';
import {
  Product,
  SortOrder,
  useEmployeePreviousWorksQuery,
  useEmployeeQuery,
  useProductsQuery,
} from '@/graphql/generated/schema';
import { getImage } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

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

  const { data: previousWork, loading: previousWorkLoading } =
    useEmployeePreviousWorksQuery({
      variables: {
        take: 8,
        where: {
          employeeId: {
            equals: params.id,
          },
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
    });
  const products = productData?.products ?? [];
  const previousWorks = previousWork?.employeePreviousWorks ?? [];
  return (
    <div className=" flex flex-col">
      <div className="w-full rounded p-5 text-center text-gray-500 ">
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
        <div className="mx-8 mt-2 t p-4">
          <Link
            href={`/product?employee=${params.id}`}
            className=" mx-auto block w-1/6 rounded-full bg-gray-900 px-6 py-2 font-semibold text-white hover:lg"
          >
            Order
          </Link>
        </div>
      </div>
      <Section
        className="group/section  my-5 mt-5 overflow-hidden lg:mt-8"
        headerClassName="items-end mb-4  gap-5"
        title=" Previous works"
      >
        {previousWorkLoading && <ListingCardLoader />}
        {!previousWorkLoading && (
          <div className="grid grid-cols-1 gap-y-8 gap-x-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:gap-y-10">
            {previousWorks.map((item, index) => (
              // @ts-ignore
              <PreviousWorkCard
                key={`top-boat-grid-${index}`}
                id={`top-boat-grid-${index}`}
                slides={item.files}
                title={item.title}
                slug={item.slug}
                link={item.link}
              />
            ))}
          </div>
        )}
      </Section>
      <Section
        className="group/section  my-5 mt-5 overflow-hidden lg:mt-8"
        headerClassName="items-end mb-4  gap-5"
        title=" Current Products"
      >
        {loading && <ListingCardLoader />}
        {!loading && (
          <TopBikes
            // @ts-ignore
            description=""
            employeeId={params.id}
            products={products as Product[]}
          />
        )}
      </Section>
    </div>
  );
}
