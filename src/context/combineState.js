import { ItemState } from "./items/state";
import { CategoryState } from "./categories/state";

export const combineState = () => {
  const itemState = ItemState();
  const categoryState = CategoryState();
  return {
    ...itemState,
    ...categoryState,
  };
};
