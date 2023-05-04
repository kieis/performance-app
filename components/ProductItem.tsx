import { memo, useState } from "react"; //can use lazy from react to dynamic imports
import dynamic from "next/dynamic";
import { AddProductToWishListProps } from "./AddProductToWishList";

/* memo usage situations
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size components, to see some real effect
 */

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    //return import("./AddProductToWishList"); works only with export default
    return import("./AddProductToWishList").then(
      (module) => module.AddProductToWishList
    );
  },
  {
    loading: () => <span>Loading...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Add to favorites
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product); //check if properties are equals
  }
);
