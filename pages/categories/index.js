import {
  InstantSearch,
  useInstantSearch,
  usePagination,
} from "react-instantsearch";
import CustomRefinementList from "../../components/CustomRefinementList";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/algolia.css";
import CustomSearchBox from "../../components/CustomSearchBox";
import CustomInfiniteHits from "../../components/CustomInfiniteHits";
import Example from "@/components/pagination";
import SearchResults from "@/components/SearchResults";
import NoResultsBoundary from "@/components/NoResultsBoundary";
import NoResults from "@/components/NoResults";

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
    <div className="mx-auto flex flex-col w-full max-w-8xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <InstantSearch
        indexName={
          process.env.NODE_ENV === "production"
            ? "production_api::product.product"
            : "development_api::product.product"
        }
        searchClient={searchClient}
      >
        <div className="ml-10">
        <CustomSearchBox query={searchQuery} />

        </div>

        <NoResultsBoundary fallback={<NoResults />}>
          <SearchResults
            searchFilters={searchFilters}
          />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  );
}
function CustomPagination() {
  const { results } = useInstantSearch();
  const {
    pages,
    currentRefinement: currentPage,
    nbHits,
    nbPages: totalPages,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination();

  const handlePageChange = (page) => {
    refine(page);
  };

  return results.hits.length ? (
    <Example
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  ) : (
    <></>
  );
}
