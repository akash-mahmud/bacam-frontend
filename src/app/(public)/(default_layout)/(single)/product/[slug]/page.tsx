'use client';

import VendorProfileCard from '@/components/ui/cards/vendor-profile-card';
import { Product, useProductQuery } from '@/graphql/generated/schema';
import { Collapse, List } from 'antd';
import { SetStateAction, useState } from 'react';

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
  return (
    <div className="mb-12 lg:mb-16">
      <div className="container mb-10 !px-0 sm:!px-0 md:mb-12 md:!px-6 xl:mb-16 2xl:!px-7 3xl:!px-8 4xl:!px-16">
        <VendorProfileCard product={product as Product} />
      </div>

      <div className="container">
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
                      <div className=' font-normaltext-base'>{item.name}</div>
                      <div className=" font-light text-justify">{item.value}</div>
                    </div>
                  </List.Item>
                )}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
}
