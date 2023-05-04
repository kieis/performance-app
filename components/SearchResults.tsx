import {
  List as LegacyList,
  AutoSizer,
  ListRowRenderer,
  ListProps,
} from "react-virtualized";
import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

/* useMemo usage situations
 * 1. Heavy Calcs
 * 2. referential Equality(passing to children component)
 */

const List = LegacyList as unknown as React.FC<ListProps>;

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  results,
  onAddToWishList,
}: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]); //(calc function, when recalc)

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map((product) => {
        return (
          <div key={product.title}>
            <ProductItem product={product} onAddToWishList={onAddToWishList} />
          </div>
        );
      })} */}
    </div>
  );
}
