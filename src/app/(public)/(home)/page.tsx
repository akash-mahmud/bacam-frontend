'use client';

import Button from '@/components/ui/button';
import EmployeeCard from '@/components/ui/cards/EmployeeCard';
import ProductCard from '@/components/ui/cards/products';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import Section from '@/components/ui/section';

import {
  Employee,
  useEmployeesQuery,
  useFindFirstHomeQuery,
  useFindManyNewsQuery,
  usePartnerShipsQuery,
  useProductsQuery,
} from '@/graphql/generated/schema';
import { getImage } from '@/utils/getImage';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactPlayer from 'react-player';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default  function HomePage() {
  const { data: PartnerShips, loading: partnerShipsLoading } =
    usePartnerShipsQuery();
  const { data: HomeData, loading: HomeDataLoading } = useFindFirstHomeQuery();
  const { data: ourTeamEmployeeData, loading: ourTeamEmployeeDataLoading } =
    useEmployeesQuery();
  // const {data:reviewData , loading:reviewsDataLoading} = useFindManyNewsQuery()
  const { data, loading } = useProductsQuery({
    variables: {
      where: {},
    },
  });
  const { data: NewsRes, loading: NewsresLoading } = useFindManyNewsQuery();
  const products = data?.products ?? [];
  const home = HomeData?.findFirstHome;
  const newsData = NewsRes?.findManyNews;
  return (
    <div className=" flex flex-col flex-grow">
      {/* <TopBikes /> */}
      <div className=" relative w-full aspect-video">
        {home?.bannerUrl && (
          <ReactPlayer
            width="100%"
            height="100%"
            playing
            loop
            url={getImage(home?.bannerUrl) ?? ''}
            controls={false}
            muted
          />
        )}
      </div>
      <div className=" container my-5  ">
        <div className=" grid md:grid-cols-2 grid-cols-1 container-fluid space-x-5">
          {newsData?.map((item, idx) => (
            
            <div key={item.id}>
              <Link href={`/news/${item.slug}`}>
              <div
               
              >
                <Image
                  className={`${
                    (idx + 1) % 2 === 0 ? ' md:h-[500px]' : 'md:h-[400px]'
                  }`}
                  src={getImage(item.fetaureMedias[0])}
                  alt={item.title}
                  height={400}
                  width={700}
                  
                />
              </div>
              <h2 className=' text-6xl font-semibold my-3'>{item.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className=" container my-5 ">
        <Section
          className="group/section container-fluid "
          headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
        >
          <h4 className=" mb-2 text-2xl font-bold">Latest product</h4>
          {loading && <ListingCardLoader />}
          {!loading && (
            <>
              <div className="">
                {products?.slice(0, 1)?.map((item, index) => (
                  <ProductCard
                    key={`explore-boat-${item.id}`}
                    id={`explore-boat-${item.id}`}
                    slides={item.images}
                    // time={item.time}
                    // caption={item.caption}
                    title={item.name}
                    slug={item.slug}
                    // location={item.location}
                    price={item.price}
                    type={item.type}
                    time={''}
                    caption={''}
                    location={''}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-y-8 gap-x-5 md:grid-cols-2 3xl:gap-y-10 mt-5">
                {products?.slice(1, products.length)?.map((item, index) => (
                  <ProductCard
                    key={`explore-boat-${item.id}`}
                    id={`explore-boat-${item.id}`}
                    slides={item.images}
                    // time={item.time}
                    // caption={item.caption}
                    title={item.name}
                    slug={item.slug}
                    // location={item.location}
                    price={item.price}
                    type={item.type}
                    time={''}
                    caption={''}
                    location={''}
                  />
                ))}
              </div>
            </>
          )}
        </Section>
      </div>

      <div className=" container my-5 ">
        <Section
          className="group/section container-fluid "
          // title={'Partnerships'}
          // description={description}
          headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
        >
          <h4 className=" mb-2 text-2xl font-bold">Our team</h4>
          {ourTeamEmployeeDataLoading && <ListingCardLoader />}
          {!ourTeamEmployeeDataLoading && (
            <div className="grid grid-cols-1 gap-y-8 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
              {ourTeamEmployeeData?.employees.map((item, index) => (
                <EmployeeCard key={item.id} {...(item as Employee)} />
              ))}
            </div>
          )}
        </Section>
      </div>
      <div className=" container my-5 ">
        <Section
          className="group/section container-fluid overflow-hidden "
          headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
        >
          <h4 className=" mb-2 text-2xl font-bold">Partnerships</h4>
          {partnerShipsLoading && <ListingCardLoader />}
          {!partnerShipsLoading && (
            <div className="grid grid-cols-1 gap-y-8 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
              {PartnerShips?.partnerShips.map((item, index) => (
                <div
                  key={item.id}
                  className="listing-card group/item relative inline-flex w-full flex-col  rounded-md "
                >
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <div className="listing-item after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
                      <div
                        className=" cursor-pointer"
                        onClick={() => window.open(item.link, '_blank')}
                      >
                        <Image
                          className="aspect-[34/25] bg-gray-lighter"
                          src={getImage(item.logo)}
                          width={816}
                          height={600}
                          alt="boat"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
