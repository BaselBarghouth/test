import { signIn, useSession } from "next-auth/react";
import React, { useState, useActionState } from "react";
  const handleFormSubmit = async (formData) => {
    try {
       const data =  await signIn("credentials", {
            email: "test@test.com",
            password: "Test321!@",
            callbackUrl: '/categories',
          });
    } catch (error) {
        return false;
        console.log("error", error);
    }


  };
export default function SignInButton({target = "/categories"}) {
  const { data: session } = useSession();
  const [success, formAction] = useActionState(handleFormSubmit, true);

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      {!success && (
        <div className="mt-2 p-2 text-red-700 bg-red-100 border border-red-400 rounded">
          Invalid Credentials
        </div>
      )}
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      >
        Log In
      </button>
    </form>
  );
}





import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button onClick={() => signOut()}>Signout</button>
}