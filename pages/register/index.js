import RegisterButton from "@/components/register";
import SignInButton from "@/components/signin";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login({ searchParams }) {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");


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
                Register a new account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 max-w">
                We are more than happy to work with you, please provide the following details and we will get back to you as soon as possible.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Business Name
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
                    
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Business Email
                    </label>
                    <div className="mt-2">
                        <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6 required"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Business Phone
                    </label>
                    <div className="mt-2">
                        <input
                        id="phone"
                        name="phone"
                        type="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        autoComplete="phone"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Business Address
                    </label>
                    <div className="mt-2">
                        <input
                        id="address"
                        name="address"
                        type="address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        autoComplete="address"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

           

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Business Description
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        autoComplete="description"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>



                <div className="flex flex-col gap-y-4">
                  <RegisterButton name={name} 
                    email={email}
                    phone={phone}
                    address={address}
                    description={description}
                    
                  
                  
                  
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
