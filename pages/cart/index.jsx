
'use client';
import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/20/solid'
import useCartStore from '@/utils/cartStore';
import { useRouter } from 'next/navigation';
import placeOrderAction from '@/_actions/place-order'
import Image from 'next/image';
import { CircleFlag } from 'react-circle-flags';
import { useSession } from 'next-auth/react';

export default function Example() {
const session = useSession()
  const { cart, removeItem, clearCart, getTotalPrice } = useCartStore((state) => state)
  
  const router = useRouter();

  const placeOrder = async (e) => {
    e.preventDefault()
    const { address,id} = session.data.user
    const total = getTotalPrice()
    const order = await placeOrderAction(cart,address,id,total);
    if(order.success){
      clearCart()
      router.push(`/confirm/${order.orderId}`);
    }

  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      width={500}
                      height={500}
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>



                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div className='flex flex-col gap-y-5'>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div
                          className={`h-8 w-8 rounded-full`}
                          style={{ backgroundColor: product.availableColors[0] }}
                        >

                        </div>
                        <p className="border-l border-gray-200  text-gray-500">{product.sizes.qty} items</p>
                        <p className="border-l border-gray-200  text-gray-500">{product.sizes.price} Euros/Per Item</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9 flex flex-col gap-y-5">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className=" w-10 rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 sm:text-sm"
                        >

                          <option dived value={product.quantity}>{product.quantity}</option>
                        </select>
                        <>
                          <span className="block mt-2 text-sm  text-gray-400">
                            Grower: {product?.grower || "Test"}
                          </span>

                          <CircleFlag countryCode={product.country} height="32" width="32" />
                        </>
                        <div className="absolute right-0 top-0">
                          <button onClick={() => removeItem(product)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>






                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.sizes.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">€ {getTotalPrice()}</dd>
              </div>
              {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div> */}
              {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
              </div> */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">€ {getTotalPrice()} €</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={placeOrder}
                className="w-full rounded-md border border-transparent bg-yellow-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Submit Order
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}


