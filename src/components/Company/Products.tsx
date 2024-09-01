'use client';

import { useState } from 'react';
import { topBoats } from 'public/data/top-boats';
import Button from '@/components/ui/button';
import { Company, useCompaniesQuery, useProductsQuery } from '@/graphql/generated/schema';
import ProductCard from '../ui/cards/products';
import { useParams } from 'next/navigation';
import CompanyCard from './CompanyCard';

export default function Products({}) {
  const [list, setList] = useState(12);
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false);
  function handleLoadMore() {
    setIsLoading(true);
    setTimeout(() => {
      setList((prevList) => prevList + 10);
      setIsLoading(false);
    }, 600);
  }
  const {data, loading} = useCompaniesQuery({
    variables:{
        where:{
        buisnessCategory:{
            is:{
              slug:{
                equals:params.buisness_category as string
              }
            }
        }
        }
    }
  })
  const companies = data?.companies??[]

  return (
    <div>
      <div className="mt-1 grid grid-cols-1 gap-y-8 gap-x-5 xs:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-4">
        {companies.map((item, index) => (
          <CompanyCard
            key={`explore-boat-${index}`}
company={item as Company}
          />
        ))}
      </div>
      {topBoats.length >= list && (
        <Button
          size="xl"
          type="button"
          isLoading={isLoading}
          onClick={() => handleLoadMore()}
          className="relative bottom-0 left-1/2 z-30 mx-auto mt-16 bg-primaryBg -translate-x-1/2 py-2.5 px-6 md:sticky md:bottom-10 md:text-base xl:relative xl:bottom-0"
        >
          Load more
        </Button>
      )}
    </div>
  );
}
