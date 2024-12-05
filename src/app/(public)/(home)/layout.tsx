import Footer from "@/components/footer/footer";
import HomeHeader from "@/components/header/HomeHeader";
import MobileNav from "@/components/ui/mobile-nav";

export default function HomeLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
          <HomeHeader />
          <section className="flex-grow">{children}</section>
          <Footer />
      <MobileNav />
    </>
  );
}
