import TransparentHeader from '@/components/header/transparent';
import MobileNav from '@/components/ui/mobile-nav';
import Footer from '@/components/footer/footer';
import ListingDetailsHeader from '@/components/header/listing-details';

export default function SingleLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <ListingDetailsHeader />
      <main className="flex-grow m-5">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
