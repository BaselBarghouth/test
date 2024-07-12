import RequestButton from "@/components/requestButton";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [grower, setGrower] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                height={1000}
                width={1000}
                className="mx-auto h-40 w-auto"
                src="/logo.jpeg"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Request a product
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 max-w">
                We are more than happy to work with you, please provide the
                following details and we will get back to you as soon as
                possible.
              </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Grower
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="grower"
                      name="grower"
                      type="grower"
                      value={grower}
                      onChange={(event) => setGrower(event.target.value)}
                      autoComplete="grower"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6 required"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country of origin
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      name="country"
                      type="country"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      autoComplete="country"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="additionalInformation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Additional Information
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="additionalInformation"
                      name="additionalInformation"
                      value={additionalInformation}
                      onChange={(event) => setAdditionalInformation(event.target.value)}
                      autoComplete="additionalInformation"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
                  <RequestButton
                    name={name}
                    country={country}
                    grower={grower}
                    additionalInformation={additionalInformation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
