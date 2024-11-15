'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { drawerStateAtom } from '@/components/drawers/view';
import Text from '@/components/ui/typography/text';
import SelectBox from '@/components/ui/select-box';
import Button from '@/components/ui/button';

const sortingOptions = [
  { id: 'opt-1', label: 'Recently visited', checked: true },
  { id: 'opt-1', label: 'Previous added', checked: true },
  { id: 'opt-1', label: 'Newer added', checked: true },
];

export default function FilterTopbar() {
  let [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
  return (
    <div className="mb-4 sm:mb-0 flex items-center justify-between">
      <Button
        variant="text"
        type="button"
        className="!p-0 focus:!ring-0 xl:hidden"
        onClick={() =>
          setDrawerState({
            ...drawerSate,
            isOpen: true,
            placement: 'right',
            view: 'FILTER_MENU',
          })
        }
      >
        <AdjustmentsHorizontalIcon className="h-auto w-6 lg:w-7" />
      </Button>
    </div>
  );
}
