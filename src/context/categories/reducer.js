import { initialState } from "./state";

const CategoryHandler = {
  GET_CATEGORIES: (state, action) => ({
    ...state,
    categories: action.payload,
  }),
  SET_SELECTED_CATEGORY: (state, action) => ({
    ...state,
    selectedCategory: action.payload,
  }),
  CLEAR_SELECTED_CATEGORY: (state) => ({
    ...state,
    selectedCategory: null,
  }),
};

const Reducer = (state, action) => {
  const handler = CategoryHandler[action.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
