'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { JetskiBoatIcon } from '@/components/icons/boat-types/jetski-boat';
import { MotorBoatIcon } from '@/components/icons/boat-types/motor-boat';
import { HouseBoatIcon } from '@/components/icons/boat-types/house-boat';
import { RibBoatIcon } from '@/components/icons/boat-types/rib-boat';
import { SailBoatIcon } from '@/components/icons/sail-boat';
import SelectBox from '@/components/ui/select-box';

const options = [
  {
    label: 'Choose food type',
    icon: <SailBoatIcon className="h-auto w-5" />,
    disabled: true,
  },
  {
    label: 'Mexican',
    icon: <HouseBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Chinese',
    icon: <MotorBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Italian',
    icon: <JetskiBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Thai',
    icon: <RibBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'First Food',
    icon: <HouseBoatIcon className="h-auto w-5" />,
  },
];

export default function BoatTypeFilter() {
  const searchParams = useSearchParams();
  const boatType = searchParams?.get('boatType');
  // const { clearFilter, updateQueryparams } = useQueryParam();
  const [selected, setSelected] = useState(options[0]);



  // sets the state if in url
  useEffect(() => {
    if (boatType) {
      const b: any = options.find((item) => item.label === boatType);
      setSelected(b);
    } else {
      setSelected(options[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boatType]);

  return (
    <SelectBox
      value={selected}
      label="Select food type"
      options={options}
      // optionIcon={true}
      optionIcon={false}
      onChange={(data: any) => setSelected(data)}
      labelClassName="mb-2 !text-sm lg:!text-base"
      buttonClassName="h-10 lg:h-11 2xl:h-12"
      arrowIconClassName="right-3"
      clearable={selected.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        setSelected(options[0]);
      }}
    />
  );
}
