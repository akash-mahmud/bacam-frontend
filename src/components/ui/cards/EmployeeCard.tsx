'use client';

import { Employee, EmployeeCategory } from '@/graphql/generated/schema';
import { getImage } from '@/utils/getImage';
import clsx from 'clsx';

import Image from 'next/image';
import Link from 'next/link';
export type IEmployeeCard = Employee & {
  className?: string;
};
export default function EmployeeCard({
  name,
  id,
  shortDescription,
  image,
  className = '',
  employeeSubCategory
  
}: IEmployeeCard) {
  return (
    <Link href={`/employee/${id}`}>
    <div
      className={clsx(
        'rounded-xl border  border-gray-200 px-6 py-6 shadow 3xl:px-8 3xl:py-8 4xl:px-12 4xl:py-10',
        className
      )}
    >
      <div>
        <Image
          src={image.includes('https') ? image : getImage(image)}
          alt={name}
          height={100}
          width={100}
          className=" rounded"
        />
      </div>

      <div className="flex items-center justify-start gap-2 text-left">
        <div>
          <span className="text-sm capitalize leading-7 text-[#222] 3xl:text-base">
            {employeeSubCategory?.name}
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-dark 3xl:text-base 4xl:text-lg">
            {name}
          </h3>
        </div>
      </div>
      <p className="mb-5 overflow-y-auto  border-b border-gray-200 pb-5 text-left text-sm text-[#222] md:leading-6 xl:text-base xl:leading-7 4xl:text-lg">
        {shortDescription}
      </p>
    </div>
    </Link>
  );
}
