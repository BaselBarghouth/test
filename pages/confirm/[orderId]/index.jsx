import Image from "next/image";
import Link from "next/link"
import { CircleFlag } from "react-circle-flags";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page({ order, orderItems,...searchParams }) {

  const { address, status, total, createdAt } = order.data.attributes
  const data = orderItems.map((item) => {
    const { product, qty, quantity_and_price } = item.attributes
    const { data: { attributes: product_attributes } } = product;
    const { data: { attributes: quantity_and_prices_attributes } } = quantity_and_price;
    return {
      name: product_attributes.name,
      color: product_attributes.color,
      size: qty * quantity_and_prices_attributes.qty,
      imageSrc: product_attributes.image_2,
      country: product_attributes.country,
      step: 1,

    }
  })
  console.log(searchParams)
  const normalizedStatus = status.trim().toLowerCase();
  const step = 'pending' == normalizedStatus ? 0 : 'processing' == normalizedStatus ? 1 : 'shipped' == normalizedStatus ? 2 : 3;
  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <Image
            width={1000}
            height={1000}
            src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-yellow-600">Order Placed Successfully</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation
              very soon!
            </p>
            <dl className="mt-16 text-sm font-medium">
              <dt className="text-gray-900">Tracking number</dt>
              <dd className="mt-2 text-yellow-600">{searchParams?.orderId}</dd>
            </dl>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
              <h4 className="sr-only">Status</h4>
              <p className="text-sm font-medium text-gray-900">
                {status} on <time dateTime={createdAt}>{createdAt}</time>
              </p>
              <div className="mt-6" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-yellow-600"
                    style={{ width: `calc((${step} * 2 + 1) / 8 * 100%)` }}
                  />
                </div>
                <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                  <div className="text-yellow-600">Pending</div>
                  <div className={classNames(step > 0 ? 'text-yellow-600' : '', 'text-center')}>
                    Processing
                  </div>
                  <div className={classNames(step > 1 ? 'text-yellow-600' : '', 'text-center')}>
                    Shipped
                  </div>
                  <div className={classNames(step > 2 ? 'text-yellow-600' : '', 'text-right')}>
                    Delivered
                  </div>
                </div>
              </div>
            </div>
            <ul
              role="list"
              className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
            >
              {data.map((product) => (
                <li key={product.id} className="flex space-x-6 py-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-gray-900">
                      <a href={'#'}>{product.name}</a>
                    </h3>
                    <div
                      className={`h-8 w-8 rounded-full`}
                      style={{ backgroundColor: product.color }}
                    >

                    </div>
                    <CircleFlag countryCode={product.country} height="32" width="32" />

                    <p>{product.size}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base">€ {total}</dd>
              </div>
            </dl>

            <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
              <div>
                <dt className="font-medium text-gray-900">Shipping Address</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">{address.data.attributes.name}</span>
                    <span className="block">{address.data.attributes.AddressLineOne
                    }</span>
                    <span className="block">{address.data.attributes.Contry}</span>
                    <span className="block">{address.data.attributes.Phone}</span>

                  </address>
                </dd>
              </div>

            </dl>

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link href="/categories" className="text-sm font-medium text-yellow-600 hover:text-yellow-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}



export async function getServerSideProps(context) {
  const { orderId } = context.query;

  const id = orderId
  const order = await doRequest(`orders/${id}?populate=*`, "GET");
  const order_items = order.data.attributes.order_items;

  const orderItemsPromises = order_items.data.map(async (item) => {
    const { id } = item;
    const orderItem = await doRequest(`order-items/${id}?populate=*`, "GET");
    return orderItem.data;
  });

  const orderItems = await Promise.all(orderItemsPromises);
  return {
    props: {
      order,
      orderItems
    },
  };
}

const doRequest = async (url, method) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDER_TOKEN}`,
  };
  try {
    let options = {
      method,
      headers,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`,
      options
    );

    // Check if the response is ok (status in the range 200-299)
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (error) {
    console.error("Error making request:", error);
    return null; // Or throw an error or handle as needed
  }
};