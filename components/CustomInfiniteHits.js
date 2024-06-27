
import React from "react";
import { useInfiniteHits } from "react-instantsearch";
import Card from "./Card";
export default function CustomInfiniteHits(props) {
  const { results } = useInfiniteHits(props);
  return (
    <div className="lg:grid lg:grid-cols-4 gap-4">
    {results?.hits.map((hit, index) => (
        <Card key={index} hit={hit} />
    ))}
  </div>
  );
}
