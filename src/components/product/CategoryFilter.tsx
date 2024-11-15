// @ts-nocheck
'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SelectBox from '@/components/ui/select-box';
import { useCategoriesQuery } from '@/graphql/generated/schema';
import { useUpdateSearchParams } from '@/utils/searchParams';

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  // const { clearFilter, updateQueryparams } = useQueryParam();
  const [selected, setSelected] = useState({});
  const { createQueryString } = useUpdateSearchParams();

  const { data } = useCategoriesQuery(); 
  const router = useRouter();
  const pathName = usePathname();
  const categories = data?.categories ?? [];
  const options = categories?.map((category) => ({
    label: category.name,
    value: category.slug,
  }));
  return (
    <SelectBox
      value={selected}
      label="Select Bike Category"
      options={options}
      // optionIcon={true}
      optionIcon={false}
      onChange={(data: any) => {
        const updatedparams = createQueryString('category', data.value);
        router.push(`${pathName}?${updatedparams}`);
        setSelected(data);
      }}
      labelClassName="mb-2 !text-sm lg:!text-base"
      buttonClassName="h-10 lg:h-11 2xl:h-12"
      arrowIconClassName="right-3"
      clearable={selected.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        const updatedparams = createQueryString('category', '');
        router.push(`${pathName}?${updatedparams}`);

        setSelected({});
      }}
    />
  );
}
