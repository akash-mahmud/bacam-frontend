'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import InputIconOnClear from '@/components/ui/form-fields/field-clear-btn';
import { useModal } from '@/components/modals/context';
import ActionIcon from '@/components/ui/action-icon';
import { useUpdateSearchParams } from '@/utils/searchParams';

interface SearchboxProps {
  className?: string;
}

export default function Searchbox({ className }: SearchboxProps) {
  const { closeModal } = useModal();
  const searchParams = useSearchParams();
  const search = searchParams?.get('q');
  let [state, setState] = useState('');
  const [isClearable, setIsClearable] = useState(false);
  const { createQueryString } = useUpdateSearchParams();
  const router = useRouter();
  function handleSubmit(e: any) {
    e.preventDefault();
    if (state) {
      closeModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const updatedparams = createQueryString('search', state);
      router.push(`/product?${updatedparams}`);
    }
  }

  // clearable icon true or false
  useEffect(() => {
    if (state) {
      setIsClearable(true);
    } else {
      setIsClearable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // if already exists in the url
  useEffect(() => {
    if (search) {
      setState(search);
    } else {
      setState('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <form
      noValidate
      className={clsx('relative w-full max-w-sm xl:max-w-[600px]', className)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="h-full w-full rounded-full 2 gray-lighter py-3 pr-[72px] pl-4 text-base font-semibold none outline-0 transition-all duration-200 placeholder:text-gray focus:gray-dark focus:outline-0 focus:ring-0 focus:ring-gray-lighter 3xl:py-3.5 3xl:pr-20 3xl:pl-6"
        placeholder="Search..."
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <ActionIcon
        rounded="full"
        className="absolute right-[6px] top-1/2 -translate-y-1/2 !rounded-full text-white 3xl:!h-10 3xl:!w-10"
        onClick={handleSubmit}
      >
        <MagnifyingGlassIcon className="h-4 w-4 xl:h-5 xl:w-5" />
      </ActionIcon>
      {isClearable && (
        <InputIconOnClear
          size="xl"
          className="absolute right-12 top-1/2 -translate-y-1/2 scale-125 3xl:right-14"
          onClick={() => {
            setState('');
            if (search) {
            }
          }}
        />
      )}
    </form>
  );
}
