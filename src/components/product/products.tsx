'use client';

import { useState } from 'react';
import { topBoats } from 'public/data/top-boats';
import Button from '@/components/ui/button';
import { useProductsQuery } from '@/graphql/generated/schema';
import { useParams, useSearchParams } from 'next/navigation';
import ProductCard from '../ui/cards/products';

export default function Products({}) {
  const [list, setList] = useState(12);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  function handleLoadMore() {
    setIsLoading(true);
    setTimeout(() => {
      setList((prevList) => prevList + 10);
      setIsLoading(false);
    }, 600);
  }
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') ?? '';
  const { data } = useProductsQuery({
    variables: {
      where: {
        category: category
          ? {
              is: {
                slug: {
                  equals: category,
                },
              },
            }
          : undefined,
      },
    },
  });
  const products = data?.products ?? [];
  console.log(products);

  return (
    <div>
      <div className="mt-1 grid grid-cols-1 gap-y-8 gap-x-5 xs:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-4">
        {products.map((item, index) => (
          <ProductCard
            key={`explore-boat-${index}`}
            id={`explore-boat-${index}`}
            slides={item.images}
            // time={item.time}
            // caption={item.caption}
            title={item.name}
            slug={item.slug}
            // location={item.location}
            price={item.price}
            type={item.type}
            time={''}
            caption={''}
            location={''} // ratingCount={item.ratingCount}
            // rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
}
