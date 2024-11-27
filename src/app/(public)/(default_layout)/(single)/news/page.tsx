"use client"
import NewsCard from '@/components/ui/cards/NewsCard';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader'
import Section from '@/components/ui/section'
import { useFindManyNewsQuery } from '@/graphql/generated/schema';
import React from 'react'

export default function Page() {
    const { data: findManyNewsdata, loading: findmanyNewsLoading } =
    useFindManyNewsQuery();
  return (
    <Section
    className="group/section  my-5 mt-5 overflow-hidden lg:mt-8"
  >
    {findmanyNewsLoading && <ListingCardLoader />}
    {!findmanyNewsLoading && (
      <div className="grid grid-cols-1 gap-y-8 gap-x-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:gap-y-10">
        {findManyNewsdata?.findManyNews.map((item, index) => (
          // @ts-ignore
          <NewsCard
            key={`top-boat-grid-${index}`}
            id={`top-boat-grid-${index}`}
            fetaureMedias={item.fetaureMedias}
            title={item.title}
            slug={item.slug}
          />
        ))}
      </div>
    )}
  </Section>
  )
}
