import { CartItemType } from "../redux/cart/types";

export const findCartItem = (items: CartItemType[], action: any) => {
  return items.find(
    (obj) =>
      obj.id === action.payload.id &&
      obj.type === action.payload.type &&
      obj.size === action.payload.size
  );
};
