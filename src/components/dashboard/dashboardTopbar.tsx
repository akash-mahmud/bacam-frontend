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

export default function DashboardTopbar() {
  let [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
  const [selected, setSelected] = useState(sortingOptions[0]);
  return (
    <div className="mb-8 flex items-center justify-between md:hidden">
      <Button
        variant="text"
        type="button"
        className="!p-0 focus:!ring-0 "
        onClick={() =>
          setDrawerState({
            ...drawerSate,
            isOpen: true,
            placement: 'right',
            view: 'DASHBOARD_SIDEBAR',
          })
        }
      >
        <AdjustmentsHorizontalIcon className="h-auto w-6 lg:w-7" />
      </Button>
    </div>
  );
}
