'use client';

import { TopBikes } from '@/components/home/top-bikes';
import VendorProfileCard from '@/components/ui/cards/vendor-profile-card';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import Section from '@/components/ui/section';
import {
  Product,
  SortOrder,
  useProductQuery,
  useProductsLazyQuery,
} from '@/graphql/generated/schema';
import { Collapse, List } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';

export default function UserPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const handleCollapseChange = (keys: SetStateAction<string[]>) => {
    setActiveKeys(keys); // Update the active keys when a panel is opened or closed
  };
  const { data } = useProductQuery({
    variables: {
      where: {
        slug: slug,
      },
      fetauresWhere2: {
        product: {
          is: {
            slug: {
              equals: slug,
            },
          },
        },
      },
    },
  });
  const product = data?.product;
  const [
    LoadRelatedProducts,
    { data: RelatedProduct, loading: RelatedProductLoading },
  ] = useProductsLazyQuery({
    variables: {
      take: 8,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      where: {
        slug: {
          not: {
            equals: slug,
          },
        },
        category: {
          is: {
            slug: {
              equals: product?.category.slug,
            },
          },
        },
      },
    },
  });
  useEffect(() => {
    if (product?.category.slug) {
      LoadRelatedProducts();
    }
  }, [LoadRelatedProducts, product?.category.slug]);

  return (
    <div className="mb-12 lg:mb-16">
      <div className="container mb-10 !px-0 sm:!px-0 md:mb-12 md:!px-6 xl:mb-16 2xl:!px-7 3xl:!px-8 4xl:!px-16">
        <VendorProfileCard product={product as Product} />
      </div>
      <div className="container  ">
        <div className=" flex md:flex-row flex-col flex-wrap ">
          <div className=" basis-[20%] grow-[2]">
            <h3 className=" text-xl font-bold">Description</h3>
          </div>
          <div className="bg-gray-200 basis-[80%] grow-[8]  p-3 mb-5 rounded text-lg">
            {product?.description}
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-5 ">
        <div className=" flex md:flex-row flex-col flex-wrap">
          <div className="   basis-[20%] grow-[2]" />
          <div className="basis-[80%] grow-[8]">
            <Collapse
              className=" !bg-white shadow-xl"
              activeKey={activeKeys}
              onChange={handleCollapseChange}
            >
              {product?.fetauresCategories?.map((elem) => (
                <Collapse.Panel
                  header={
                    <span
                      className={` text-lg ${
                        activeKeys.includes(elem.id) ? ' ' : 'font-light'
                      }`}
                    >
                      {elem.name}
                    </span>
                  }
                  key={elem.id}
                >
                  <List
                    dataSource={elem.fetaures}
                    renderItem={(item) => (
                      <List.Item>
                        <div className=" flex   w-full justify-items-center justify-between  ">
                          <div className=" font-normaltext-base">
                            {item.name}
                          </div>
                          <div className=" font-light text-justify">
                            {item.value}
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
      <hr />
      <div className="container my-5">
        <div className=" flex md:flex-row flex-col flex-wrap ">
          <div className=" basis-[20%] grow-[2] w-full">
            <h3 className=" text-xl font-bold">Reviews (0)</h3>
          </div>
          <div className=" basis-[80%] grow-[8]  ">
            <div className=" flex  flex-col ">
              <div className=" ">
                <p>There are no reviews yet.</p>
              </div>
              <div className=" border  p-5 rounded text-lg">
                Only logged in customer who have purchased this product may
                leave a review.
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container pb-5 my-5 ">
        <h3 className=" text-xl font-bold">Related products</h3>
        <Section
          className="group/section   overflow-hidden mt-5 "
          title={''}
          description={''}
          headerClassName="items-end gap-5"
        >
          {RelatedProductLoading && <ListingCardLoader />}
          {!RelatedProductLoading && (
            <TopBikes
              products={(RelatedProduct?.products ?? []) as Product[]}
            />
          )}
        </Section>
      </div>
    </div>
  );
}
