'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';

import PriceFilter from '@/components/product/price-filter';
import { drawerStateAtom } from '@/components/drawers/view';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';

interface FilterTypes {
  className?: string;
}

export default function Filter({ className }: FilterTypes) {
  let [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
  const searchParams = useSearchParams();
  let params = searchParams?.toString();
  const [state, setState] = useState(false);

  // reset button true or false
  useEffect(() => {
    if (params) {
      setState(true);
    } else {
      setState(false);
    }
  }, [params]);
const router = useRouter()
  return (
    <div
      className={clsx(
        'h-full overflow-y-auto bg-white  border p-5 rounded shadow-lg',
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between py-2 px-5 pt-3 uppercase md:px-7 xl:px-0 xl:pt-0">
        <Text tag="h5" className="leading-8">
          Filter
        </Text>
        {state && (
          <Button
            type="reset"
            variant="text"
            className="hidden !p-0 text-base text-gray focus:!ring-0 sm:block"
            onClick={() => router.push("/product")}
            >
            Reset
          </Button>
        )}
        <Button
          type="reset"
          variant="text"
          className="!p-0 text-base text-gray focus:!ring-0 sm:hidden"
          onClick={() =>
            setDrawerState({
              ...drawerSate,
              isOpen: false,
            })
          }
        >
          Close
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 px-5 pb-3 md:px-7 xl:p-0 xl:pb-0">
        <CategoryFilter />

        <PriceFilter />
      </div>
      <div className="sticky inset-x-0 bottom-0 z-10 mt-4 flex items-center justify-between bg-white py-3 px-5 uppercase shadow-card sm:hidden md:px-7 xl:px-0">
        <div>
          {state && (
            <Button
              type="reset"
              variant="text"
              className="!p-0 text-base text-gray underline focus:!ring-0"
              onClick={() => router.push("/product")}
            >
              Reset
            </Button>
          )}
        </div>
        <Button
          variant="solid"
          rounded="DEFAULT"
          size="xl"
          className="!px-4 font-semibold"
          onClick={() =>
            setDrawerState({
              ...drawerSate,
              isOpen: false,
            })
          }
        >
          Show Items
        </Button>
      </div>
    </div>
  );
}
