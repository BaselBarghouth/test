import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";

export default function SignInButton({target = "/categories",email, password}) {
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const handleFormSubmit = async (event) => {
    try {
       const data =  await signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: '/categories',
          });
    } catch (error) {
        setError('Invalid credentials');
    }


  };
  return (
    <div className="flex flex-col gap-2">
        {
            error && <div className="text-red-500">{error}</div>
        }
      <button
      onClick={handleFormSubmit}
        className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      >
        Log In
      </button>
    </div>
  );
}





import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button onClick={() => signOut()}>Signout</button>
}