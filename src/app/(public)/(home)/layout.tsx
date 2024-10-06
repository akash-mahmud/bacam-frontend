import TransparentHeader from '@/components/header/transparent';
import MobileNav from '@/components/ui/mobile-nav';
import Footer from '@/components/footer/footer';

export default function HomeLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <TransparentHeader />
      <section className="flex-grow">{children}</section>
      <Footer />
      <MobileNav />
    </>
  );
}
