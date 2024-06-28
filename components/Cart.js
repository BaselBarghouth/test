import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import useCartStore from "../utils/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

export default function Cart() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [open, setOpen] = useState(false);
  const length = getTotalItems();
  console.log({ cart });
  return (
    <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
      <PopoverButton
        className="group -m-2 flex items-center p-2 outline-yellow-600"
        x
      >
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-yellow-600 "
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-yellow-700 ">
          {length}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </PopoverButton>
      <div>
        <PopoverPanel
          transition
          className="absolute inset-x-0 z-20 top-16 mt-px bg-white pb-6 shadow-lg transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5 shadow-gray-600"
        >
          <h2 className="sr-only">Shopping Cart</h2>
          <form className="mx-auto max-w-2xl px-4">
            <ul role="list" className="divide-y divide-gray-200 flex flex-col gap-y-4">
              {cart.map((product) => (
                <li key={product.id} className="flex items-center py-6 gap-x-4 shadow shadow-gray-400">
                  <div className="">
                    <button
                      onClick={() => removeItem(product)}
                      type="button"
                      className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove</span>
                      <XMarkIcon 
                                className="h-6 w-6 flex-shrink-0 text-yellow-600 "
 
                      />
                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="black" height={5} width={5} viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg> */}
                    </button>
                  </div>

                  <Image
                    width={64}
                    height={64}
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-16 w-16 flex-none rounded-md border border-gray-200"
                  />
                  <div className="ml-4 flex-auto">
                    <h3 className="font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {cart.length > 0 ? (
              <>
                <div>
                  <p className="mt-6 text-center">
                    <PopoverButton
                      onClick={() => clearCart()}
                      type="submit"
                      className="w-40 h-9 rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Empty Cart
                    </PopoverButton>
                  </p>
                </div>
                <p className="mt-6 h-10 text-center">
                  <PopoverButton
                    onClick={() => router.push("/cart")}
                    className="w-40 h-9 rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    View Cart
                  </PopoverButton>
                </p>
              </>
            ) : (
              <p className="mt-6 text-center">
                <PopoverButton
                  onClick={() => router.push("/categories")}
                  className="text-sm font-medium text-yellow-600 hover:text-yellow-500"
                >
                  your cart is empty Continue Shopping
                </PopoverButton>
              </p>
            )}
          </form>
        </PopoverPanel>
      </div>
    </Popover>
  );
}
