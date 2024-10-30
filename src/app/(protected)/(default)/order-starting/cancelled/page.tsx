import Link from 'next/link';

export default function page() {
  return (
    <div className="container">
      <div className="text-center flex flex-col items-center justify-center h-screen align-middle content-center my-auto mx-0">
        <h1>
          Your order has been created but you cancelled the payment. Check your
          orders for make the payment
        </h1>
        <Link
          className=" my-5 p-2 bg-primaryBg text-white rounded"
          href={'/dashboard/myorders'}
        >
          My Orders
        </Link>
      </div>
    </div>
  );
}
