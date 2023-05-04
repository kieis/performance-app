export interface AddProductToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishList({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishListProps) {
  return (
    <span>
      Want to add to wish list?
      <button onClick={onAddToWishList}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </span>
  );
}
