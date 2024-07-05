import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import {  useSearchBox } from "react-instantsearch";

export default function CustomSearchBox(props) {
    const { query, refine } = useSearchBox(props);
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef(null);
  
    function setQuery(newQuery) {
      setInputValue(newQuery);
  
      refine(newQuery);
    }
    useEffect(() => {
      if(props.query) {
        setQuery(props.query);
      }
    }, [props.query]);
    return (
        <form
          action=""
          role="search"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
  
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }}
          onReset={(event) => {
            event.preventDefault();
            event.stopPropagation();
  
            setQuery("");
  
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <div className="w-full sm:max-w-xs">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-yellow-600"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none focus-visible:border-yellow-200 focus:ring-yellow-600 sm:text-sm sm:leading-6"
                ref={inputRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Search for products"
                spellCheck={false}
                maxLength={512}
                type="search"
                value={inputValue}
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                }}
                autoFocus
              />
            </div>
          </div>
        </form>
    );
  }