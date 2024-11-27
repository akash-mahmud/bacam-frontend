'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import type { ListingItemTypes } from '@/types';
import { ChevronRightIcon } from '@/components/icons/chevronRight';
import { ChevronLeftIcon } from '@/components/icons/chevronLeft';
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Pagination,
} from '@/components/ui/slider';
import ActionIcon from '@/components/ui/action-icon';
import { getImage } from '@/utils/getImage';
import { ProductType } from '@/graphql/generated/schema';
import { useSearchParams } from 'next/navigation';
import { getFileType } from '@/utils/fileType';
import ReactPlayer from 'react-player';
import Button from '../button';

export default function PreviousWorkCard({
  id,
  slides,
  type,
  title,
  slug,
  location,
  link,
  employeeId,
}: ListingItemTypes) {

  return (
    <>
      <div className="listing-card group/item relative inline-flex w-full flex-col  p-5 rounded-md border shadow-lg">
        <div className="relative w-full overflow-hidden rounded-xl">
          <div className="listing-item ">
            <Swiper
              className="!static cursor-pointer"
              modules={[Navigation]}
              slidesPerView={1}
              navigation={{
                nextEl: `.${id}-previousWork-item-button-next`,
                prevEl: `.${id}-previousWork-item-button-prev`,
              }}
            >
              {slides?.map((slide, index) => (
                <SwiperSlide key={`slide-${index}`}>
                  {getFileType(slide) === 'image' ? (
                    <Image
                      className="aspect-[34/25] bg-gray-lighter"
                      src={getImage(slide)}
                      width={816}
                      height={600}
                      alt="boat"
                      priority
                    />
                  ) : getFileType(slide) === 'video' ? (
                    <div className=" w-full aspect-video">
                      <ReactPlayer
                        url={getImage(slide)}
                        controls
                        stopOnUnmount
                        height={'100%'}
                        width={'100%'}
                      />
                    </div>
                  ) : null}
                </SwiperSlide>
              ))}
            </Swiper>
            <ActionIcon
              rounded="full"
              color="light"
              size="sm"
              className={clsx(
                'absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 shadow-md !transition-all focus:!ring-0 md:invisible md:flex md:disabled:hidden md:group-hover/item:visible',
                `${id}-previousWork-item-button-prev`,
              )}
            >
              <ChevronLeftIcon className="-ml-0.5 h-auto w-[7px]" />
            </ActionIcon>
            <ActionIcon
              rounded="full"
              size="sm"
              color="light"
              className={clsx(
                'absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 opacity-80 shadow-md !transition-all duration-300 focus:!ring-0 md:invisible md:flex md:disabled:hidden md:group-hover/item:visible md:group-hover/item:opacity-100',
                `${id}-previousWork-item-button-next`,
              )}
            >
              <ChevronRightIcon className="-mr-0.5 h-auto w-[7px]" />
            </ActionIcon>
          </div>
        </div>

        <div className="content pt-3">
          <h4 className="text-ellipsis text-gray-dark 2xl:mb-1.5">{title}</h4>
          <p className="mb-3 text-gray-light xl:mb-3">{location}</p>
          <div className="flex flex-wrap items-center justify-end gap-3">
            {link && (
              <Button onClick={() => window.open(link, '_blank')}>Visit</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
