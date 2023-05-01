import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

/* useMemo usage situations
 * 1. Heavy Calcs
 * 2. referential Equality(passing to children component)
 */

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]); //(calc function, when recalc)

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return (
          <div key={product.title}>
            <ProductItem product={product} />
          </div>
        );
      })}
    </div>
  );
}
