'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
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
import {
  ProductType,
  useFindUniqueNewsQuery,
} from '@/graphql/generated/schema';
import { useParams, useSearchParams } from 'next/navigation';
import { getFileType } from '@/utils/fileType';
import ReactPlayer from 'react-player';

export default function Page() {
  const params = useParams();
  const { data, loading } = useFindUniqueNewsQuery({
    variables: {
      where: {
        slug: String(params?.slug),
      },
    },
  });
  const news = data?.findUniqueNews;
  return (
    <div className=" flex flex-col justify-center container ">
      <div>
        <h1 className=" font-semibold text-5xl mx-11 my-3 mb-5">
          {news?.title}
        </h1>
        <div className="listing-item ">
          <Swiper
            autoHeight
            className="!static cursor-pointer"
            modules={[Navigation]}
            slidesPerView={1}
            navigation={{
              nextEl: `.${news?.id}-previousWork-item-button-next`,
              prevEl: `.${news?.id}-previousWork-item-button-prev`,
            }}
          >
            {news?.fetaureMedias?.map((slide, index) => (
              <SwiperSlide key={`slide-${index}`}>
                {getFileType(slide) === 'image' ? (
                  <div className=" prose lg:prose-lg !max-w-screen-2xl lg:mx-auto xs:max-lg:mx-5 dark:prose-invert">
                    <Image
                      sizes="(max-width: 1024px) 100vw, 1480px"
                      className="w-full rounded-xl"
                      src={getImage(slide)}
                      width={1460}
                      height={750}
                      alt="boat"
                      priority
                    />
                  </div>
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
              'absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 md !transition-all focus:!ring-0 md:invisible md:flex md:disabled:hidden md:group-hover/item:visible',
              `${news?.id}-previousWork-item-button-prev`,
            )}
          >
            <ChevronLeftIcon className="-ml-0.5 h-auto w-[7px]" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            size="sm"
            color="light"
            className={clsx(
              'absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 opacity-80 md !transition-all duration-300 focus:!ring-0 md:invisible md:flex md:disabled:hidden md:group-hover/item:visible md:group-hover/item:opacity-100',
              `${news?.id}-previousWork-item-button-next`,
            )}
          >
            <ChevronRightIcon className="-mr-0.5 h-auto w-[7px]" />
          </ActionIcon>
        </div>
        <div className=" mx-11 my-5 ">{parse(String(news?.description))}</div>
      </div>
    </div>
  );
}
