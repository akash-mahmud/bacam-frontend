export default function HomeLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <section className="flex-grow">{children}</section>
    </>
  );
}
