

export default function ListingDetailsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="flex-grow">{children}</main>
      {/* <ReserveBottomMenu /> */}
    </>
  );
}
