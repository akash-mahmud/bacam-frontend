'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { DestinationTypes } from '@/types';

export default function BusinessCategoryCard({
  thumbnail,
  slug,
  name,
  location,
}: DestinationTypes) {
  return (
    <Link
      href={slug}
      className="group/item relative flex aspect-auto 2 card-gradient h-[200px] w-full flex-col  overflow-hidden rounded-xl lg:h-[280] 2xl:h-[300px] 4xl:h-[350px]"
    >
      <Image
        src={thumbnail}
        alt="destination"
        fill
        sizes="(min-width: 320) 100vw, 100vw"
        className="relative z-0 rounded-xl bg-gray-lighter object-cover transition-all duration-500 group-hover/item:scale-110"
      />
      <div className="relative z-10 mt-auto px-6 pb-6 md:px-7 md:pb-7 3xl:px-9 3xl:pb-9 4xl:px-12 4xl:pb-12">
        <h3 className="text-xl font-bold leading-7 text-center text-black 3xl:text-2xl">
          {name}
        </h3>
      </div>
    </Link>
  );
}
