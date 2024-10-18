'use client';

import { getImage } from '@/utils/getImage';
import clsx from 'clsx';

import Image from 'next/image';
export interface IEmployeeCard {
  name: string
  description: string
  image: string,
  role: string,
  className: string,
}
export default function EmployeeCard({
  name,
  description,
  image,
  role,
  className = '',
}: IEmployeeCard) {

  return (

      <div 
      // className="grid grid-cols-1 gap-y-8 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10"
        className={clsx(
          'card-gradient rounded-xl border-2 border-gray-200 py-6 px-6 3xl:py-8 3xl:px-8 4xl:py-10 4xl:px-12',
          className
        )}
      >
<div>

        <Image src={image.includes("https")? image: getImage(image)} alt={name} height={100} width={100} className=' rounded'/>
</div>

        <div className="flex items-center justify-start text-left gap-2">
          <div>
            <span className="text-sm capitalize leading-7 text-[#222] 3xl:text-base">
              {role}
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-dark 3xl:text-base 4xl:text-lg">
              {name}
            </h3>

          </div>

        </div>
        <p className="mb-5 border-b h-40 overflow-y-auto border-gray-200 pb-5 text-sm text-left text-[#222] md:leading-6 xl:text-base xl:leading-7 4xl:text-lg">
          {description}
        </p>
      </div>

  );
}
