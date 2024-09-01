'use client';

import { useState } from 'react';
import { topBoats } from 'public/data/top-boats';
import Button from '@/components/ui/button';
import { useProductsQuery } from '@/graphql/generated/schema';
import { useParams } from 'next/navigation';
import ProductCard from '../ui/cards/products';

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

  const {data} = useProductsQuery({
    variables:{
    
    }
  })
  const products = data?.products??[]
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
            slug={`/product/${item.slug}`}
            // location={item.location}
            price={item.price}
            // ratingCount={item.ratingCount}
            // rating={item.rating}
          />
        ))}
      </div>
      {topBoats.length >= list && (
        <Button
          size="xl"
          type="button"
          isLoading={isLoading}
          onClick={() => handleLoadMore()}
          className="relative bottom-0 left-1/2 z-30 mx-auto mt-16 -translate-x-1/2 py-2.5 px-6 md:sticky md:bottom-10 md:text-base xl:relative xl:bottom-0"
        >
          Load more
        </Button>
      )}
    </div>
  );
}
