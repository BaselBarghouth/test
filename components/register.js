import React, { useState } from "react";

export default function RegisterButton({email, name, phone,address, description, title ='Register'}) {
  const [error, setError] = useState(null);
  const handleRegisterForm = async (event) => {
      const body = JSON.stringify({
        data:{
          email, name, phone,address, description
      }
      });
    try {
       const data =  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/registers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_REGISTER_TOKEN}`
        },
        body,
       }  );
         const json = await data.json();
    } catch (error) {
      console.log({error});
        setError(error.message);
    }


  };
  return (
    <div className="flex flex-col gap-2">
        {
            error && <div className="text-red-500">{error}</div>
        }
      <button
      onClick={handleRegisterForm}
        className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      >
        {title}
      </button>
    </div>
  );
}


