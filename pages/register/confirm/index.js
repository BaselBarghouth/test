import Link from "next/link"


export default function Confirm() {
  return (
    <div className="mx-auto flex flex-col w-full max-w-8xl items-center gap-y-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <div className="w-full max-w-md p-6 space-y-4">
        <div className="flex flex-col items-center justify-center ">
          <CircleCheckIcon className="text-yellow-500 h-16 w-16" />
          <h1 className="text-2xl font-bold">Registration Successful!</h1>
          <p className="text-muted-foreground text-center my-4">Thank you for registering with our web shop. We will contact you very soon in order to provide you with the credentials. </p>
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


function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function XIcon(props) {
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
      color="#ca8a04"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}