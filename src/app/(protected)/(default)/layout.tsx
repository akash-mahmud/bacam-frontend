import Footer from '@/components/footer/footer';
import MobileNav from '@/components/ui/mobile-nav';
import ListingDetailsHeader from '@/components/header/listing-details';

export default function ProtectedDefaultLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      {/* <TransparentHeader />
       */}
      <ListingDetailsHeader />

      <main className="flex-grow">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
