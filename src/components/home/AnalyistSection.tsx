'use client';

import { useTimeout } from '@/hooks/use-timeout';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Autoplay,
} from '@/components/ui/slider';
import TestimonialCard from '@/components/ui/cards/testimonial';
import BlockLoader from '@/components/ui/loader/block-loader';
import { testimonials } from 'public/data/testimonials';
import ActionIcon from '@/components/ui/action-icon';
import Section from '@/components/ui/section';

import { useEmployeesQuery } from '@/graphql/generated/schema';
import EmployeeCard from '../ui/cards/EmployeeCard';

export default function AnalyistSection() {

  const { data, loading } = useEmployeesQuery({
    variables: {
      take: 10
    }
  })
  return (
    <Section
    title="Our analysis team"
    description="Unsatiable it considered invitation he traveling insensible."
    headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
    className="group/section lg:container-fluid mt-12 overflow-hidden pl-4 sm:pl-6 lg:mt-16"

    >

      {loading && <BlockLoader />}
      <div className="testimonial relative">
          <Swiper autoHeight
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={true}
            slidesPerView={4}
            spaceBetween={12}
            navigation={{
              nextEl: '.testimonial-button-next',
              prevEl: '.testimonial-button-prev',
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 1.6,
              },
              580: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              840: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {data?.employees?.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <EmployeeCard
                  name={item.name}
                  description={item.shortDescription}
                  role={item.role}
                  image={item.image}
                  className="mb-1"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <ActionIcon
            rounded="full"
            color="invert"
            className="testimonial-button-prev invisible absolute top-1/2 left-[25px] z-10 hidden -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0 md:flex lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            color="invert"
            className="testimonial-button-next invisible absolute top-1/2 right-[25px] z-10 hidden -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-[10px] md:flex lg:group-hover/section:-right-[19px]"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </ActionIcon>
        </div>
    </Section>
  );
}
