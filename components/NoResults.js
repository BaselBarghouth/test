import { useInstantSearch } from "react-instantsearch";
import Link from "next/link";

export default function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div className="mx-auto flex flex-col w-full max-w-8xl items-center gap-y-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <div className="max-w-md text-center">
        <FrownIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, No items!
        </h1>
        <p className="mt-4 text-muted-foreground">
          We could not find the items you are looking for: <strong > <div dangerouslySetInnerHTML={{__html:indexUiState?.query}}></div>  </strong>
        </p>
        <div className="mt-6 flex flex-col items-center gap-y-4">
          <Link
            href="/categories?s="
            className="w-60 rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
            prefetch={false}
          >
            Shop Again
          </Link>

          <Link
            href="/categories?s="
            className="w-60 rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
            prefetch={false}
          >
            Or Request a Product
          </Link>
        </div>
      </div>
    </div>
  );
}

function FrownIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
