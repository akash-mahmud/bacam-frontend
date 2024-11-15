
export default function SingleLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="flex-grow m-5">{children}</main>
    </>
  );
}
