import Image from "next/image";
import React, { useState } from "react";

import { hitToProduct } from "../utils/dtos";
import useCartStore from "../utils/cartStore";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Radio, RadioGroup } from "@headlessui/react";
import { CircleFlag } from "react-circle-flags";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
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
            className=" h-72  w-full object-cover object-center group-hover:opacity-75"
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
        {product.characteristics.height && (
          <div className="flex items-center rounded-bl-lg border border-transparent text-sm font-semibold text-gray-500">
            <Image
              src={"/flower-length.svg"}
              alt={product.imageAlt}
              width={32}
              height={32}
            />
            <span className="ml-2">{product.characteristics.height}</span>
          </div>
        )}

        {product.weight && (
          <div className="flex items-center rounded-bl-lg border border-transparent text-sm font-semibold text-gray-500">
            <svg
              fill="black"
              height="35px"
              width="35px"
              version="1.1"
              viewBox="0 0 315 315"
              enable-background="new 0 0 315 315"
            >
              <g>
                <path d="m278.921,306.168l-37.059-196.308c-0.625-3.307-3.514-5.701-6.879-5.701h-70.493v-15.848c32.172-0.886 58.836-7.917 77.417-20.479 17.041-11.521 26.814-27.4 26.814-43.565 0-9.173-10.882-14.89-36.385-19.114-20.053-3.324-46.634-5.153-74.846-5.153-28.212,0-54.793,1.829-74.847,5.151-25.503,4.225-36.385,9.941-36.385,19.114 0,16.165 9.773,32.044 26.814,43.565 18.582,12.563 45.245,19.594 77.417,20.479v15.849h-70.492c-3.365,0-6.254,2.395-6.879,5.701l-37.16,196.841c-0.386,2.048 0.16,4.161 1.489,5.766 1.33,1.604 3.306,2.533 5.39,2.533h229.307c0.006,0 0.014,0 0.02,0 3.866,0 7-3.134 7-7-0.001-0.633-0.085-1.247-0.243-1.831zm-188.614-288.033c18.597-2.666 42.457-4.135 67.183-4.135 24.727,0 48.586,1.469 67.184,4.135 14.9,2.136 22.762,4.487 26.782,6.131-4.02,1.644-11.882,3.996-26.782,6.132-18.598,2.666-42.457,4.135-67.184,4.135-24.727,0-48.586-1.469-67.184-4.135-14.9-2.136-22.762-4.488-26.782-6.132 4.021-1.644 11.882-3.995 26.783-6.131zm-25.711,21.307c4.928,1.458 10.915,2.757 18.048,3.938 20.053,3.322 46.634,5.151 74.847,5.151 28.213,0 54.794-1.829 74.847-5.151 7.133-1.182 13.12-2.481 18.048-3.938-3.509,6.109-9.051,11.877-16.319,16.791-12.266,8.292-35.507,18.178-76.575,18.178-41.068,0-64.31-9.886-76.575-18.178-7.27-4.914-12.812-10.681-16.321-16.791zm-13.314,261.558l34.517-182.841h143.383l34.516,182.841h-212.416z" />
              </g>
              <g>
                <path d="m157.49,130.524c-43.592,0-79.056,35.464-79.056,79.055 0,43.592 35.464,79.056 79.056,79.056 43.591,0 79.055-35.464 79.055-79.056-2.84217e-14-43.591-35.464-79.055-79.055-79.055zm40.912,86.055l23.761,.001c-1.365,12.697-6.401,24.306-14.019,33.754l-16.775-16.775c-2.734-2.732-7.166-2.732-9.9,0-2.733,2.734-2.733,7.166 0,9.9l16.775,16.775c-9.449,7.617-21.058,12.653-33.755,14.018v-23.761c0-3.866-3.134-7-7-7-3.866,0-7,3.134-7,7v23.761c-12.697-1.365-24.307-6.401-33.755-14.018l16.775-16.775c2.734-2.734 2.734-7.166 0.001-9.899s-7.166-2.733-9.899-0.001l-16.776,16.775c-7.617-9.449-12.653-21.058-14.019-33.755h23.761c3.866,0 7-3.134 7-7s-3.134-7-7-7h-23.761c1.365-12.697 6.401-24.306 14.019-33.755l16.775,16.776c1.367,1.366 3.159,2.05 4.95,2.05s3.583-0.684 4.95-2.05c2.733-2.734 2.733-7.166 0-9.9l-16.775-16.775c9.449-7.616 21.058-12.652 33.755-14.018v23.761c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-23.761c12.697,1.365 24.306,6.401 33.754,14.019l-16.775,16.774c-2.733,2.734-2.733,7.166 0,9.9 1.367,1.366 3.159,2.05 4.95,2.05s3.583-0.684 4.95-2.05l16.775-16.775c7.617,9.448 12.653,21.058 14.019,33.755l-23.761-.001c-3.865,0-7,3.134-7,7s3.134,7 7,7z" />
                <circle cx="157.49" cy="209.58" r="7.623" />
              </g>
            </svg>
            <span className="ml-2">{product.weight} gr</span>
          </div>
        )}

        {product.buds_per_stem && (
          <div className="flex items-center rounded-bl-lg border border-transparent text-sm font-semibold text-gray-500">
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium css-1oajsk3-icon"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 20 24"
              width={'35px'}
              height={'35px'}
            >
              <rect
                transform="translate(7.683013, 18.915064) rotate(30) translate(-7.683013, -18.915064)"
                x="6.6830127"
                y="12.9150635"
                width="2"
                height="12"
              ></rect>
              <rect
                transform="translate(12.683013, 19.084936) scale(-1, 1) rotate(-150) translate(-12.683013, -19.084936)"
                x="11.6830127"
                y="13.0849365"
                width="2"
                height="12"
              ></rect>
              <path d="M7.18482133,9.78946414 C7.18482133,10.6383409 7.87505167,11.3285713 8.72392844,11.3285713 C9.57280521,11.3285713 10.2630356,10.6383409 10.2630356,9.78946414 C10.2630356,9.28451861 9.6408811,8.39479631 9.34016325,8.04316953 C9.2051954,7.88511507 9.16257397,7.66786418 9.22828201,7.47074007 C9.29399004,7.27361597 9.45855611,7.1256249 9.66159985,7.08004365 C9.72730789,7.06465258 11.3285713,6.6816517 11.3285713,5.40892851 C11.3285713,4.47303299 10.5714489,3.96867942 9.85931592,3.96867942 C9.56392575,3.96867942 9.26616772,4.05392228 8.99859987,4.21552853 C8.80206773,4.33392138 8.55521862,4.32800174 8.36460613,4.20132138 C8.17399363,4.07464103 8.07395167,3.84910264 8.10710167,3.62238032 C8.11953292,3.53595354 8.13196417,3.46728568 8.13196417,3.39565801 C8.13196417,2.5473732 7.44173382,1.85714286 6.59285705,1.85714286 C5.74398028,1.85714286 5.05374994,2.5473732 5.05374994,3.39565801 C5.05374994,3.46728568 5.06618119,3.53595354 5.07624458,3.60402943 C5.10998655,3.83075175 5.01053655,4.06576157 4.81992405,4.19244192 C4.62871959,4.31971424 4.38364638,4.33332942 4.18711424,4.21552853 C3.91954639,4.05392228 3.62238032,3.96867942 3.32699015,3.96867942 C2.61426516,3.96867942 1.85714286,4.47303299 1.85714286,5.40892851 C1.85714286,6.6816517 3.45840622,7.06465258 3.52648211,7.08063562 C3.72834193,7.12680883 3.89172407,7.27598383 3.95684014,7.471924 C4.02195621,7.66904811 3.97992675,7.88511507 3.84614282,8.04257756 C3.46254997,8.49247041 2.92267855,9.33187575 2.92267855,9.78946414 C2.92267855,10.6383409 3.6129089,11.3285713 4.46178567,11.3285713 C5.31066244,11.3285713 6.00089278,10.6383409 6.00089278,9.78946414 C6.00089278,9.46269986 6.26609277,9.19749986 6.59285705,9.19749986 C6.91962133,9.19749986 7.18482133,9.46269986 7.18482133,9.78946414 M8.84,13 C7.8936,13 7.04795,12.55735 6.5,11.869 C5.95205,12.55735 5.1064,13 4.16,13 C2.5116,13 1.17,11.6584 1.17,10.01 C1.17,9.3171 1.58145,8.5384 1.94805,7.982 C1.01855,7.5309 0,6.64495 0,5.2 C0,3.5841 1.27985,2.31855 2.91395,2.31855 C3.1343,2.31855 3.35465,2.3426 3.57045,2.3907 C3.84865,1.0283 5.05635,0 6.5,0 C7.94365,0 9.15135,1.0283 9.42955,2.3907 C9.646,2.3426 9.86635,2.31855 10.0867,2.31855 C11.72015,2.31855 13,3.5841 13,5.2 C13,6.64495 11.98145,7.5309 11.05195,7.982 C11.41855,8.5384 11.83,9.3171 11.83,10.01 C11.83,11.6584 10.4884,13 8.84,13"></path>
              <path d="M6.49879288,5.10714286 C5.73063216,5.10714286 5.10593574,5.73183929 5.10593574,6.5 C5.10593574,7.26816071 5.73063216,7.89285714 6.49879288,7.89285714 C7.26695359,7.89285714 7.89165002,7.26816071 7.89165002,6.5 C7.89165002,5.73183929 7.26695359,5.10714286 6.49879288,5.10714286 M6.49879288,9.28571429 C4.96247145,9.28571429 3.71307859,8.03632143 3.71307859,6.5 C3.71307859,4.96367857 4.96247145,3.71428571 6.49879288,3.71428571 C8.03511431,3.71428571 9.28450716,4.96367857 9.28450716,6.5 C9.28450716,8.03632143 8.03511431,9.28571429 6.49879288,9.28571429"></path>
              <path d="M14.1848213,9.78946414 C14.1848213,10.6383409 14.8750517,11.3285713 15.7239284,11.3285713 C16.5728052,11.3285713 17.2630356,10.6383409 17.2630356,9.78946414 C17.2630356,9.28451861 16.6408811,8.39479631 16.3401633,8.04316953 C16.2051954,7.88511507 16.162574,7.66786418 16.228282,7.47074007 C16.29399,7.27361597 16.4585561,7.1256249 16.6615999,7.08004365 C16.7273079,7.06465258 18.3285713,6.6816517 18.3285713,5.40892851 C18.3285713,4.47303299 17.5714489,3.96867942 16.8593159,3.96867942 C16.5639258,3.96867942 16.2661677,4.05392228 15.9985999,4.21552853 C15.8020677,4.33392138 15.5552186,4.32800174 15.3646061,4.20132138 C15.1739936,4.07464103 15.0739517,3.84910264 15.1071017,3.62238032 C15.1195329,3.53595354 15.1319642,3.46728568 15.1319642,3.39565801 C15.1319642,2.5473732 14.4417338,1.85714286 13.5928571,1.85714286 C12.7439803,1.85714286 12.0537499,2.5473732 12.0537499,3.39565801 C12.0537499,3.46728568 12.0661812,3.53595354 12.0762446,3.60402943 C12.1099866,3.83075175 12.0105366,4.06576157 11.8199241,4.19244192 C11.6287196,4.31971424 11.3836464,4.33332942 11.1871142,4.21552853 C10.9195464,4.05392228 10.6223803,3.96867942 10.3269902,3.96867942 C9.61426516,3.96867942 8.85714286,4.47303299 8.85714286,5.40892851 C8.85714286,6.6816517 10.4584062,7.06465258 10.5264821,7.08063562 C10.7283419,7.12680883 10.8917241,7.27598383 10.9568401,7.471924 C11.0219562,7.66904811 10.9799268,7.88511507 10.8461428,8.04257756 C10.46255,8.49247041 9.92267855,9.33187575 9.92267855,9.78946414 C9.92267855,10.6383409 10.6129089,11.3285713 11.4617857,11.3285713 C12.3106624,11.3285713 13.0008928,10.6383409 13.0008928,9.78946414 C13.0008928,9.46269986 13.2660928,9.19749986 13.5928571,9.19749986 C13.9196213,9.19749986 14.1848213,9.46269986 14.1848213,9.78946414 M15.84,13 C14.8936,13 14.04795,12.55735 13.5,11.869 C12.95205,12.55735 12.1064,13 11.16,13 C9.5116,13 8.17,11.6584 8.17,10.01 C8.17,9.3171 8.58145,8.5384 8.94805,7.982 C8.01855,7.5309 7,6.64495 7,5.2 C7,3.5841 8.27985,2.31855 9.91395,2.31855 C10.1343,2.31855 10.35465,2.3426 10.57045,2.3907 C10.84865,1.0283 12.05635,0 13.5,0 C14.94365,0 16.15135,1.0283 16.42955,2.3907 C16.646,2.3426 16.86635,2.31855 17.0867,2.31855 C18.72015,2.31855 20,3.5841 20,5.2 C20,6.64495 18.98145,7.5309 18.05195,7.982 C18.41855,8.5384 18.83,9.3171 18.83,10.01 C18.83,11.6584 17.4884,13 15.84,13"></path>
              <path d="M13.5,5.10714286 C12.7318393,5.10714286 12.1071429,5.73183929 12.1071429,6.5 C12.1071429,7.26816071 12.7318393,7.89285714 13.5,7.89285714 C14.2681607,7.89285714 14.8928571,7.26816071 14.8928571,6.5 C14.8928571,5.73183929 14.2681607,5.10714286 13.5,5.10714286 M13.5,9.28571429 C11.9636786,9.28571429 10.7142857,8.03632143 10.7142857,6.5 C10.7142857,4.96367857 11.9636786,3.71428571 13.5,3.71428571 C15.0363214,3.71428571 16.2857143,4.96367857 16.2857143,6.5 C16.2857143,8.03632143 15.0363214,9.28571429 13.5,9.28571429"></path>
              <rect x="9" y="12" width="2" height="13"></rect>
              <rect x="6" y="12" width="8" height="4" rx="2"></rect>
            </svg>
            <span className="ml-2">{product.buds_per_stem} buds</span>
          </div>
        )}

        <CircleFlag countryCode={product.country} height="32" width="32" />

        <div
          className={`h-8 w-8 rounded-full`}
          style={{ backgroundColor: product.availableColors[0] }}
        ></div>
      </div>
      <div>
        <span className="block mt-2 text-sm  text-gray-400">
          Grower: {product?.grower || "Test"}
        </span>
      </div>
      {session?.data?.user ? (
        <>
       <Listbox value={selectedSizes} onChange={setSelectedSizes}>
      <Label className="block text-sm font-medium leading-6 text-gray-900">Quantity and Prices</Label>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 sm:text-sm sm:leading-6">
          <span className="block truncate">Quantity: {selectedSizes.qty} | Per Item: {selectedSizes.price} €</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {product.sizes.map((size, index)  => (
            <ListboxOption
            key={index}
            value={size}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-yellow-600 data-[focus]:text-white"
            >
             <span className="block truncate font-normal group-data-[selected]:font-semibold">
  Quantity: {size.qty} | Per Item: {size.price} €
</span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-yellow-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>

          <button
            onClick={handleClick}
            type="submit"
            className="w-full outline-none rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {buttonText}
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="w-full outline-none rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          {" "}
          Long in so you can purchase our products
        </Link>
      )}
    </div>
  );
}