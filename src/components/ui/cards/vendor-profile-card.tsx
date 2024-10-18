'use client';

import {
  Product,
  ProductPaymentTypes,
  ProductType,
  useAggregateOrderItemQuery,
  useCartItemsExistOrNotForThisProductLazyQuery,
  useCreateCheckoutSessionMutation,
  useUpsertOneCartItemMutation,
} from '@/graphql/generated/schema';
import { getImage } from '@/utils/getImage';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import ActionIcon from '../action-icon';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Button from '../button';
import AuthRequiredButton from '@/components/auth/AuthRequiredButton';
import { useStripe } from '@stripe/react-stripe-js';
import { Flex, notification, Progress, Spin, Tooltip } from 'antd';
import { formatPriceNumber } from '@/utils/priceFormat';
import useAuth from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCartItemCount } from '@/store/slices/product/cart';
export default function VendorProfileCard({ product }: { product?: Product }) {
  const [qty, setqty] = useState(1);
  const [CreateSession, { loading }] = useCreateCheckoutSessionMutation();
  const stripe = useStripe();

  const createPaymentSession = async () => {
    if (product?.id) {
      const { data } = await CreateSession({
        variables: {
          input: {
            paymentType: ProductPaymentTypes.OrderStartPrice,
            productIds: [product?.id],
            quantity: qty,
          },
        },
      });

      if (data?.createCheckoutSession?.id) {
        stripe?.redirectToCheckout({
          sessionId: data?.createCheckoutSession?.id,
        });
      }
    }
  };

  const { data } = useAggregateOrderItemQuery();
  const ordersForThisProductCount = data?.aggregateOrderItem?._sum?.qty ?? 0;
  const percentage =
    ordersForThisProductCount > 0
      ? (ordersForThisProductCount /
          (product?.minimumOrderNeededToStart ?? 1)) *
        100
      : 0;
  const { user } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const [ExistCartItem, { loading: ExistCartItemLoading }] =
    useCartItemsExistOrNotForThisProductLazyQuery({
      fetchPolicy: 'network-only',
    });
  const { cart } = useAppSelector((store) => store.cart);
  const [AddTocart, { loading: AddToCartLoading }] =
    useUpsertOneCartItemMutation({
      fetchPolicy: 'network-only',
    });
  const dipatch = useAppDispatch();
  const addTocartItem = async () => {
    if (!user?.id) {
      router.push(`/sign-in?redirectTo=${path}`);
    } else {
      const { data } = await ExistCartItem({
        variables: {
          where: {
            productId: {
              equals: product?.id,
            },
            cartId: {
              equals: cart?.id,
            },
          },
        },
      });
      const cartItem = data?.cartItems[0] ?? {};
      console.log(cartItem);

      const res = await AddTocart({
        variables: {
          where: {
            id: cartItem.id ?? 'noItem',
          },
          create: {
            product: {
              connect: {
                id: product.id,
              },
            },
            quantity: qty,
            cart: {
              connect: {
                id: cart?.id,
              },
            },
          },
          update: {
            quantity: {
              set: (cartItem?.quantity ?? 0) + qty,
            },
          },
        },
      });
      console.log(res.data?.upsertOneCartItem);
      if (res.data?.upsertOneCartItem?.id) {
        await dipatch(fetchCartItemCount());
      }
    }
  };
  return (
    <div className="relative flex flex-col justify-center px-4 text-center  md:mt-8 md:flex-row  md:justify-between md:overflow-hidden md:rounded-lg md:px-0   2xl:mt-12 ">
      <div className="relative mx-3 w-full overflow-hidden rounded-xl md:w-[60%] ">
        <div>
          <h1 className=" text-left text-4xl font-medium">{product?.name}</h1>
        </div>
        <div className="">
          <ImageGallery
            showNav={true}
            renderLeftNav={(onclick) => (
              <ActionIcon
                onClick={onclick}
                rounded="full"
                color="light"
                size="xl"
                className=" absolute inset-y-0 left-5  z-50 mx-0 my-auto"
              >
                <ChevronLeftIcon className="-ml-0.5 " />
              </ActionIcon>
            )}
            renderRightNav={(onclick) => (
              <ActionIcon
                onClick={onclick}
                rounded="full"
                color="light"
                size="xl"
                className=" absolute inset-y-0 right-5  z-50 mx-0 my-auto"
              >
                <ChevronRightIcon className="-mr-0.5 " />
              </ActionIcon>
            )}
            showFullscreenButton={false}
            showPlayButton={false}
            items={
              product?.images.map((img) => ({
                thumbnail: getImage(img) ?? '',
                original: getImage(img) ?? '',
                // renderItem: ((item: ReactImageGalleryItem) =>

                //   <ImageMagnifier src={item.original} imageClasses='image-gallery-image'

                //   />

                // )
              })) ?? []
            }
          />
        </div>
      </div>

      <div
        className="z-10 mt-20 flex h-auto w-full flex-col rounded-lg  border bg-white p-8 shadow-lg md:mt-0   md:h-full md:w-[40%]  
      
      "
      >
        <div className="flex flex-col items-start justify-start ">
          <div className=" flex w-full flex-row flex-wrap justify-between gap-2">
            <div className="  text-3xl">
              {formatPriceNumber(product?.price)}
            </div>
            <>
              <div className=" text-left text-base">
                {product?.type === ProductType.Custom && (
                  <p>
                    Order starting price:{' '}
                    {formatPriceNumber(product?.orderStartPrice ?? 0)}
                  </p>
                )}
                <p className="text-base">In Stock: {product?.stock}</p>
              </div>
            </>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="quantity-input"
              className="my-2 block text-left font-bold text-gray-900 dark:text-white"
            >
              Quantity:
            </label>
            <div className="relative flex max-w-[8rem] items-center">
              <button
                onClick={() => setqty((prev) => (prev > 1 ? prev - 1 : prev))}
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="h-3 w-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="number"
                value={qty}
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="999"
                onChange={(event) => setqty(parseInt(event.target.value))}
              />
              <button
                onClick={() => setqty((prev) => prev + 1)}
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="h-3 w-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="my-3 flex flex-col ">
            <label>Project starting minimum order progress</label>
            <Tooltip
              title={`${ordersForThisProductCount}/${product?.minimumOrderNeededToStart}`}
            >
              <Progress percent={percentage} />
            </Tooltip>
          </div>

          <div className=" my-5 flex w-full flex-col">
            <Spin spinning={ExistCartItemLoading || AddToCartLoading}>
              <Button
                variant="outline"
                className=" my-3 w-full rounded-md py-4 "
                onClick={addTocartItem}
              >
                Add to Cart
              </Button>
            </Spin>
            <AuthRequiredButton>
              <Spin spinning={loading} className=" w-full">
                <Button
                  type="button"
                  className=" my-3 w-full rounded-md py-4 "
                  onClick={async () => {
                    await createPaymentSession();
                  }}
                >
                  Buy now with one click
                </Button>
              </Spin>
            </AuthRequiredButton>
          </div>
        </div>
      </div>
    </div>
  );
}
