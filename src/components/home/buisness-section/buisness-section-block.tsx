'use client';

import { useTimeout } from '@/hooks/use-timeout';
import BlockLoader from '@/components/ui/loader/block-loader';
import Section from '@/components/ui/section';
import BuisnessSectionCarousel from './buisness-section-carousel';
import { useBuisnessCategoriesQuery } from '@/graphql/generated/schema';

export default function DestinationBlock() {
const {data, loading} = useBuisnessCategoriesQuery() 
const businessSection = data?.buisnessCategories??[]
  return (
    <Section
      title="Top Buisness sections"
      // description="Unsatiable it considered invitation he traveling insensible."
      className="lg:container-fluid mt-8 pl-4 sm:pl-6 "
      headerClassName="mb-4 md:mb-5 xl:mb-6"
    >
      {loading && <BlockLoader />}
      {!loading && <BuisnessSectionCarousel data={businessSection} />}
    </Section>
  );
}
