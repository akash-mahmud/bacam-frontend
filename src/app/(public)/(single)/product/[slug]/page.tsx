'use client';

import VendorProfileCard from '@/components/ui/cards/vendor-profile-card';
import ProfileListBlock from '@/components/profile/profile-list-block';
import { Product, useProductQuery } from '@/graphql/generated/schema';
import ProductNavigation from '@/components/product/ProductNavigation';

export default function UserPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data } = useProductQuery({
    variables: {
      where: {
        slug: slug,
      },
    },
  });
  const product = data?.product;
  return (
    <div className="mb-12 lg:mb-16">
      <div className="container mb-10 !px-0 sm:!px-0 md:mb-12 md:!px-6 xl:mb-16 2xl:!px-7 3xl:!px-8 4xl:!px-16">
        <VendorProfileCard product={product as Product} />
      </div>
      <div className="container">
        <ProductNavigation product={product as Product} className={''} />
      </div>
    </div>
  );
}
