import { ItemState } from "./items/state";

export const combineState = () => {
  const itemState = ItemState();

  return {
    ...itemState,
  };
};
