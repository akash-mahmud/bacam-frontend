'use client';

import Button from '@/components/ui/button';
import EmployeeCard from '@/components/ui/cards/EmployeeCard';
import ProductCard from '@/components/ui/cards/products';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import Section from '@/components/ui/section';

import {
  Employee,
  useEmployeesQuery,
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
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default async function HomePage() {
  const { data: PartnerShips, loading: partnerShipsLoading } =
    usePartnerShipsQuery();
  const { data: findManyNewsdata, loading: findmanyNewsLoading } =
    useFindManyNewsQuery();
  const { data: ourTeamEmployeeData, loading: ourTeamEmployeeDataLoading } =
    useEmployeesQuery();
  // const {data:reviewData , loading:reviewsDataLoading} = useFindManyNewsQuery()
  const { data, loading } = useProductsQuery({
    variables: {
      where: {},
    },
  });
  const products = data?.products ?? [];
  return (
    <div className=" flex flex-col flex-grow">
      {/* <TopBikes /> */}
      <div className="flex flex-col">
        <div className="slide-container">
          {findManyNewsdata?.findManyNews && (
            <Slide
              transitionDuration={100}
              duration={1000}
              autoplay={findManyNewsdata?.findManyNews.length > 1}
              infinite
              pauseOnHover={false}
              canSwipe={findManyNewsdata?.findManyNews.length > 1}
              slidesToShow={1}
            >
              {findManyNewsdata?.findManyNews.map((item, index) => (
                <div key={index} className=" relative ">
                  <div
                    key={index}
                    className={`w-full h-[60vh] bg-cover bg-center cursor-grab `}
                    style={{
                      backgroundImage: `url(${getImage(
                        item.fetaureMedias[0],
                      )})`,
                    }}
                  >
                    <div className=" absolute bottom-[30%] w-full">
                      <div className=" flex justify-center md:justify-end w-full space-x-5">
                        <div className=" w-2/3 md:w-[40%] space-y-5">
                          <h3 className=" font-bold text-2xl md:text-5xl cursor-text">
                            {item.title}
                          </h3>
                          <Button className="">View More</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slide>
          )}
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
                  className="listing-card group/item relative inline-flex w-full flex-col shadow-md p-5 rounded-md border"
                >
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <div className="listing-item after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
                      <div className=' cursor-pointer' onClick={() => window.open(item.link, '_blank')}>
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
                  <Link href={''}>
                    <div className="content pt-3">
                      <h4 className="text-ellipsis text-gray-dark 2xl:mb-1.5">
                        {item.name}
                      </h4>
                   
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
