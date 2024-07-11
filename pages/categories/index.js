import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/algolia.css";
import CustomSearchBox from "../../components/CustomSearchBox";
import SearchResults from "@/components/SearchResults";
import NoResultsBoundary from "@/components/NoResultsBoundary";
import NoResults from "@/components/NoResults";
import { useRouter } from "next/router";

export default function Layout({ searchQuery }) {
  const { query } = useRouter();
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
  );

  const searchFilters = [
    "category",
    "color",
    "country",
  ];
  return (
    <div className="mx-auto flex flex-col w-full max-w-8xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <InstantSearch
        indexName={
          'production_api::product.product'
          // process.env.NODE_ENV === "production"
          //   ? "production_api::product.product"
          //   : "development_api::product.product"
        }
        searchClient={searchClient}
      >
        <div className="ml-10">
          <CustomSearchBox query={query?.s} />
        </div>

        <NoResultsBoundary fallback={<NoResults />}>
          <SearchResults searchFilters={searchFilters} />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  );
}
