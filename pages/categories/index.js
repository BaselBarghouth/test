import { InstantSearch, Pagination, useInstantSearch } from "react-instantsearch";
import CustomRefinementList from "./CustomRefinementList";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/algolia.css";
import CustomSearchBox from "./CustomSearchBox";
import CustomInfiniteHits from "./CustomInfiniteHits";

export default function Layout({ searchQuery }) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
  );

  const searchFilters = [
    "color",
    "country",
    "grower",
    "length",
    "weight",
    "category",
  ];
  return (
    <div className="mx-auto flex w-full max-w-8xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <InstantSearch indexName="production_api::product.product" searchClient={searchClient}>
        <aside className="sticky top-8 hidden w-66 shrink-0 lg:block border-r-2 border-yellow-500 px-2">
          {searchFilters.map((filter, index) => (
            <CustomRefinementList key={index} attribute={filter} />
          ))}
        </aside>
        <main className="flex-1">
        <CustomSearchBox query={searchQuery} />
        <CustomInfiniteHits />
          <div className="mt-20">
            <CustomPagination />
          </div>
        </main>
      </InstantSearch>
    </div>
  );
}
function CustomPagination() {
  const { results } = useInstantSearch();
  return results.hits.length ? (
    <Pagination style={{ display: "50px" }} />
  ) : (
    <></>
  );
}
