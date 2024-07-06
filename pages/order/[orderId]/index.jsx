import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { CircleFlag } from 'react-circle-flags'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Order({ orders ,orderItems}) {


  const mappedOrders = orders.map((order) => {
    const { id, attributes: { address, status, total, createdAt } } = order
    const data = orderItems.map(({ id, attributes }) => {
      const { product, qty, quantity_and_price } = attributes
      const { data: { attributes: quantity_and_prices_attributes } } = quantity_and_price;

      return {
        name: attributes.name,
        color: attributes.color,
        size: qty * quantity_and_prices_attributes.qty,
        imageSrc: `/images/${changeString(product.data?.attributes.name)}.jpg`,
        country: attributes.country,
        country: product.data?.attributes.country,
        color: product.data?.attributes.color,

      }
    })

    return {
      number: id,
      address,
      status,
      total,
      createdDatetime: createdAt,
      createdDate: createdAt,
      products: data
    }
  })
  const checkStep = (status)=>{
    const normalizedStatus = status.trim().toLowerCase();
    return   'pending' == normalizedStatus ? 0 : 'processing' == normalizedStatus ? 1 : 'shipped' == normalizedStatus ? 2 : 3;
  }
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover similar products.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {mappedOrders.map((order) => (

                <>
                
                <div className="mt-6" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-yellow-600"
                    style={{ width: `calc((${checkStep(order.status)} * 2 + 1) / 8 * 100%)` }}
                  />
                </div>
                <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                  <div className="text-yellow-600">Pending</div>
                  <div className={classNames(checkStep(order.status) > 0 ? 'text-yellow-600' : '', 'text-center')}>
                    Processing
                  </div>
                  <div className={classNames(checkStep(order.status) > 1 ? 'text-yellow-600' : '', 'text-center')}>
                    Shipped
                  </div>
                  <div className={classNames(checkStep(order.status) > 2 ? 'text-yellow-600' : '', 'text-right')}>
                    Delivered
                  </div>
                </div>
              </div>

              <div
                  key={order.number}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order.number}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={order.createdDatetime}>{new Date(order.createdDate).toDateString()}</time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="mt-1 font-medium text-gray-900">€  {order.total}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Delivery</dt>
                        <dd className="mt-1 font-medium text-gray-900">    <div className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                          <p className="ml-2 text-sm font-medium text-gray-500">
                            {/* Delivered on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time> */}
                          </p>
                        </div></dd>
                      </div>
                    </dl>
                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Options for order {order.number}</span>
                          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href={order.href}
                                className={classNames(
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                )}
                              >
                                View
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href={order.invoiceHref}
                                className={classNames(
                                  focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                )}
                              >
                                Invoice
                              </Link>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <Link
                        href={'#'}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                      >
                        <span>View Invoice</span>
                      </Link>
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                    {order.products.map((product, productIdx) => (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <Image
                            width={500}
                            height={500}
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div><div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div className='flex flex-col gap-y-5'>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link href={'#'} className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.name}
                                  </Link>
                                </h3>
                              </div>
                              <div
                                className={`h-8 w-8 rounded-full`}
                                style={{ backgroundColor: product.color }}
                              >

                              </div>
                              <p className="border-l border-gray-200  text-gray-500"> {product.size} pieces</p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9 flex flex-col gap-y-5">

                              <>
                                <span className="block mt-2 text-sm  text-gray-400">
                                  Grower: {product?.grower || "Test"}
                                </span>

                                <CircleFlag countryCode={product.country} height="32" width="32" />
                              </>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                </>
              
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export async function getServerSideProps(context) {
  const session = await getSession(context);

    if(!session?.user){
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
    const { orderId } = context.query;

  const { data } = await doRequest(`orders/${orderId}?populate=*`, "GET");
//   const orders = await Promise.all(data.map(async (order) => {
    const { attributes: { order_items } } = data
    const orderItemsPromises = order_items.data.map(async (item) => {
      const { id } = item;
      const orderItem = await doRequest(`order-items/${id}?populate=*`, "GET");
      return orderItem.data;
    });

    const orderItems = await Promise.all(orderItemsPromises);
    // return {
    //   order,
    //   orderItems
    // }
//   }))


  return {
    props: {
      orders:[data],
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${url}`,
      options
    );
    //Check if the response is ok (status in the range 200-299)
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (error) {
    console.error("Error making request:", error);
    return null; // Or throw an error or handle as needed
  }
};

function changeString(string) {
  if (typeof string !== "string") {
    return "";
  }
  // Convert to lowercase
  var lowercaseString = string.toLowerCase();

  // Replace spaces with underscores
  return lowercaseString.replace(/ /g, "_");
}