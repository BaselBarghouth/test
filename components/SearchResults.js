import React from "react";
import CustomRefinementList from "./CustomRefinementList";
import CustomInfiniteHits from "./CustomInfiniteHits";
import { useInstantSearch, usePagination } from "react-instantsearch";
import Example from "./pagination";

export default function SearchResults({ searchFilters }) {

  return (
    // nbHits > 0 ?
    <div className="mx-auto flex w-full max-w-8xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-none">
      <aside className="sticky top-8 hidden w-66 shrink-0 lg:block px-2">
        {searchFilters.map((filter, index) => (
          <CustomRefinementList key={index} attribute={filter} />
        ))}
      </aside>
      <main className="flex-1">

        <CustomInfiniteHits />
        <div className="mt-20">
          <CustomPagination />
        </div>
      </main>
    </div>
    //  : <div className="mx-auto flex w-full max-w-8xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 border-none"> No results found </div>
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
