import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const collections = [
    {
      name: "Cut Flowers",
      href: '/categories',
      imageSrc: '/cut-flowers.webp',
      imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
    },
    {
      name: "PLants",
      href: '/categories',
      imageSrc: '/plants.jpg',
      imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
    },
    {
      name: 'Flowers and plants pots and more',
      href: '/categories',
      imageSrc: '/Plant-Pots-Collection.webp',
      imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
  ]
export default function Hero() {
  return (
    <div className="relative">
    {/* Background image and overlap */}
    <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
      <div className="relative w-full flex-1 bg-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <Image
          height={1080} 
          width={1920}
          src={'/hero-back-ground.jpg'}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gray-900 opacity-50" />
      </div>
      <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
    </div>

    <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
      {/* Background image and overlap */}
      <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
        <div className="relative w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <Image
            height={500}
            width={600}
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-48 w-full bg-white" />
      </div>
      <div className="relative py-32">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Mila Rose</h1>
        <p className=" text-gray-300 ">Make it easy for you to shop cut flowers and plants</p>

        <div className="mt-4 sm:mt-6">
          <Link
            href="/categories"
            className="inline-block rounded-md border border-transparent bg-yellow-600 px-8 py-3 font-medium text-white hover:bg-yellow-700"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>

    <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
      <h2 id="collection-heading" className="sr-only">
        Collections
      </h2>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
          >
            <div>
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                  <Image
                  height={500}
                  width={600}
                    src={collection.imageSrc}
                    alt={collection.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
              </div>
              <div className="absolute inset-0 flex items-end rounded-lg p-6">
                <div>
                  <p aria-hidden="true" className="text-sm text-white">
                    Shop the collection
                  </p>
                  <h3 className="mt-1 font-semibold text-white">
                    <Link href={collection.href}>
                      <span className="absolute inset-0" />
                      {collection.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
  )
}
