import Image from "next/image";
import React, { useState } from "react";

import { hitToProduct } from "../utils/dtos";
import useCartStore from "../utils/cartStore";
import { Radio, RadioGroup } from "@headlessui/react";
import { CircleFlag } from "react-circle-flags";
import { useSession } from "next-auth/react";
export default function Card({ hit }) {
  const product = hitToProduct(hit);
  const [buttonText, setButtonText] = useState("Add To Cart");
  const session = useSession();
  const [selectedSizes, setSelectedSizes] = useState(product.sizes[0]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const { addItem, cart } = useCartStore((state) => state);
  const handleClick = () => {
    let tmp = product;
    product.sizes = selectedSizes;
    addItem(tmp);
    setButtonText("Added!");
    setTimeout(() => setButtonText("Add To Cart"), 2000); // Reset text after 2 seconds
  };
  return (
    <div className="p-5  flex flex-col gap-y-2 shadow-lg shadow-gray-500">
      <div className="group relative ">
        <div className="aspect-h-1  w-full rounded-md bg-gray-200">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            width={600}
            height={600}
          />
        </div>

        <div className="mt-6">
          <h3 className="mt-1 font-semibold text-gray-900">
            <a href={product.href}>
              <span className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2">
        <div className="flex items-center rounded-bl-lg border border-transparent text-sm font-semibold text-gray-500">
          <Image src={'/flower-length.svg'} alt={product.imageAlt} width={32} height={32}/>
          <span className="ml-2">{product.characteristics.height} cm</span>
        </div>

        <div className="flex items-center rounded-bl-lg border border-transparent text-sm font-semibold text-gray-500">
          <Image src={'/wieght.svg'} alt={product.imageAlt}  width={32} height={32}/>
          <span className="ml-2">{product.weight} gr</span>
        </div>
        <div
          className={`h-8 w-8 rounded-full`}
          style={{ backgroundColor: product.availableColors[0] }}
        >

        </div>
        <CircleFlag countryCode={product.country} height="32" width="32" />
      </div>
      <div>
        <span className="block mt-2 text-sm  text-gray-400">
          Grower: {product?.grower || "Test"}
        </span>
      </div>
      {session?.data?.user && (
        <>
          <RadioGroup
            value={selectedSizes}
            onChange={setSelectedSizes}
            className="flex items-center space-x-3"
          >
            {product.sizes.map((size,index) => (
              <Radio
                key={index}
                value={size}
                className={({ focus, checked }) =>
                  classNames(
                    size.inStock
                      ? "cursor-pointer focus:outline-none"
                      : "cursor-not-allowed opacity-25",
                    focus ? "ring-2 ring-yellow-500 ring-offset-2" : "",
                    checked
                      ? "border-transparent bg-yellow-600 text-white hover:bg-yellow-700"
                      : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                    "flex items-center justify-center rounded-md border px-3 py-3 text-sm uppercase sm:flex-1 shadow shadow-gray-700 font-semibold text-gray-500"
                  )
                }
                disabled={!size.inStock}
              >
                <div className="flex flex-col">
                  <div className={"font-semibold text-xs "}>
                    X {size.qty} pieces 
                  </div>
                  <div className="font-semibold text-xs">
                    € {size.price}/Per Item
                  </div>
                </div>
              </Radio>
            ))}
          </RadioGroup>

          <button
            onClick={handleClick}
            type="submit"
            className="w-full outline-none rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
}

function changeString(string){

  // Convert to lowercase
  var lowercaseString = string.toLowerCase();
  
  // Replace spaces with underscores
  return lowercaseString.replace(/ /g, "_");
    }
