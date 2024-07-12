import Link from "next/link"


export default function Confirm() {
  return (
    <div className="mx-auto flex text-center flex-col w-full max-w-8xl items-center gap-y-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <div className="w-full max-w-md p-6 space-y-4">
        <div className="flex flex-col items-center justify-center ">
          <CircleCheckIcon className="text-yellow-500 h-16 w-16" />
          <h1 className="text-2xl font-bold">Request the product was Successful!</h1>
          <p className="text-muted-foreground text-center my-4">We will contact you as soon as we find your product, thanks a lot for your request.</p>
        </div>
        <div className="mt-6 flex flex-col items-center gap-y-4">
       
        <Link
            href="/categories?s="
            className="w-60 rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
            prefetch={false}
          >
            Check our collections 
          </Link>
          </div>
      </div>
    </div>
  )
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}




