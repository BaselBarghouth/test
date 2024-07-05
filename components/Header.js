import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./auth/logout-button";
import { useSession } from "next-auth/react";
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/20/solid";
import useCartStore from "../utils/cartStore";
import CartV2 from "./CartV2";
import { useState } from "react";
export default function Header() {
  const session = useSession();
  const user = session.data?.user;
  const cart = useCartStore((state) => state.cart);
  const length = cart.length;
  const [openCart, setOpenCart] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    {
      name: "Categories",
      href: "/categories",
      current: pathname === "/categories",
    },
    // { name: "About us", href: "/about-us", current: pathname === "/about-us" },
    {
      name: "Contact us",
      href: "/contact-us",
      current: pathname === "/contact-us",
    },
  ];
  const userNavigation = [{ name: "Orders", href: "/order" }];
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    height={500}
                    width={500}
                    className="h-14 w-auto"
                    src="/logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item, index) => (
                    <Link
                      key={"hrf-" + index}
                      href={item.href}
                      className={
                        "inline-flex items-center  px-1 pt-1 text-sm font-medium " +
                        (item.current
                          ? "text-gray-900 border-b-2 border-yellow-700"
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-700")
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                {user ? (
                  <>
                    {/* <Cart /> */}
                    <button onClick={() => setOpenCart(!openCart)}>
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-yellow-600 "
                        aria-hidden="true"
                      />
                    </button>

                    <span className="ml-2 text-sm font-medium text-yellow-700 ">
                      {length}
                    </span>
                    <CartV2 open={openCart} setOpen={setOpenCart} />

                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Image
                            height={500}
                            width={500}
                            className="h-8 w-8 rounded-full"
                            src={user.image}
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              {({ focus }) => (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    focus ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </MenuItem>
                          ))}
                          <MenuItem>
                            {({ focus }) => (
                              <SignOutButton
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              />
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
              <button onClick={() => setOpenCart(!openCart)}>
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-yellow-600 "
                        aria-hidden="true"
                      />
                    </button>

                    <span className="ml-2 text-sm font-medium text-yellow-700 ">
                      {length}
                    </span>
                    <CartV2 open={openCart} setOpen={setOpenCart} />
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    "block  bg-yellow-50 py-2 pl-3 pr-4 text-base font-medium " +
                    (item.current
                      ? "border-l-4 border-yellow-500 text-yellow-700"
                      : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700")
                  }
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            {user ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      height={500}
                      width={500}
                      className="h-10 w-10 rounded-full"
                      src={user.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
