'use client';

import { Employee } from '@/graphql/generated/schema';
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
  employeeSubCategory,
}: IEmployeeCard) {
  return (
    <div
      className={clsx(
        'rounded-xl border bg-sectionSecondary max-w-md text-white  border-gray-200 px-6 py-6 shadow 3xl:px-8 3xl:py-8 4xl:px-12 4xl:py-10',
        className,
      )}
    >
      <Link href={`/employee/${id}`}>
        <div className=" mb-5">
          <Image
            src={image.includes('https') ? image : getImage(image)}
            alt={name}
            // height={100}
            // width={100}
            width={816}
            height={600}
            className="aspect-[34/25] bg-gray-50 rounded"
          />
        </div>

        <div className="flex items-center justify-start gap-2 text-left">
          <div>
            <span className="text-sm capitalize leading-7  3xl:text-base">
              {employeeSubCategory?.name}
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wide  3xl:text-base 4xl:text-lg">
              {name}
            </h3>
          </div>
        </div>
        <p className="mb-5 overflow-y-auto  border-b border-gray-200 pb-5 text-left text-sm  md:leading-6 xl:text-base xl:leading-7 4xl:text-lg">
          {shortDescription}
        </p>
      </Link>
    </div>
  );
}
