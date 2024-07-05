import { useInstantSearch } from "react-instantsearch";

export default function NoResults() {
    const { indexUiState } = useInstantSearch();
  
    return (
      <div>
        <p>
          No results for <q>{indexUiState.query}</q>.
        </p>
      </div>
    );
  }