'use client';

import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import ListingCard from '@/components/ui/cards/products';
import SeeMore from '@/components/ui/see-more';
import Section from '@/components/ui/section';
import {
  Product,
  SortOrder,
  useProductsQuery,
} from '@/graphql/generated/schema';

export function TopBikes({
  products,
  employeeId,
}: {
  products: Product[];
  employeeId?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-y-8 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {products.map((item, index) => (
        // @ts-ignore
        <ListingCard
          employeeId={employeeId}
          key={`top-boat-grid-${index}`}
          id={`top-boat-grid-${index}`}
          slides={item.images}
          time={item.createdAt}
          type={item.type}
          //   caption={item.}
          title={item.name}
          slug={item.slug}
          //   location={item.location}
          price={item.price ?? 0}
          //   ratingCount={item.ratingCount}
          //   rating={item.rating}
          //   user={item.user}
        />
      ))}
    </div>
  );
}

export default function TopBoats({
  title = 'Latest Products',
  description = 'Unsatiable it considered invitation he traveling insensible.',
  employeeId = '',
}) {
  const { data, loading } = useProductsQuery({
    variables: {
      take: 8,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });
  return (
    <Section
      className="group/section container-fluid mt-5 overflow-hidden lg:mt-8 my-5"
      title={title}
      description={description}
      headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
      rightElement={<SeeMore />}
    >
      {loading && <ListingCardLoader />}
      {!loading && (
        <TopBikes
          employeeId={employeeId}
          products={(data?.products ?? []) as Product[]}
        />
      )}
    </Section>
  );
}
