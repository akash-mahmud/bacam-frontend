import SubscriptionBlock from '@/components/subscription/subscription-block';
import InstructionBlock from '@/components/home/instruction-block';
import PromotionalBlock from '@/components/home/promotional-block';
import TestimonialBlock from '@/components/home/testimonial-block';
import NewBoats from '@/components/home/new-boats';
import TopBoats from '@/components/home/top-boats';


export default function HomePage() {
  return (
    <>
      <InstructionBlock />
      <TopBoats />
      <PromotionalBlock />
      <NewBoats />
      <TestimonialBlock />
      <SubscriptionBlock sectionClassName="4xl:!px-16" />
    </>
  );
}
