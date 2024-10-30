'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SelectBox from '@/components/ui/select-box';

const options = [
  { label: 'Select distance', disabled: true },
  { label: '50 miles' },
  { label: '60 miles' },
  { label: '80 miles' },
  { label: '90 miles' },
];

export default function DistanceFilter() {
  const searchParams = useSearchParams();
  const dis = searchParams?.get('distance');
  const [selected, setSelected] = useState(options[0]);

  // sets the state if in url
  useEffect(() => {
    if (dis) {
      const d: any = options.find((item) => item.label === dis);
      setSelected(d);
    } else {
      setSelected(options[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dis]);

  return (
    <SelectBox
      value={selected}
      label="Distance"
      options={options}
      onChange={(data: any) => setSelected(data)}
      labelClassName="mb-2 !text-sm lg:!text-base"
      buttonClassName="h-10 lg:h-11 2xl:h-12"
      clearable={selected.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        setSelected(options[0]);
      }}
    />
  );
}
