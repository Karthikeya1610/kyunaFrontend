import { useReducer } from "react";
import axios from "axios";
import API_URLS from "../../config/api";
import Reducer from "./reducer";
import { Actions } from "./actions";

export const initialState = {
  categories: null,
  selectedCategory: null,
};

export const CategoryState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URLS.CATEGORIES}`);
      console.log("Categories response:", response);

      // The API returns data in response.data.data structure
      const categories = response.data.data || [];
      dispatch({ type: Actions.GET_CATEGORIES, payload: categories });
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return error;
    }
  };

  const setSelectedCategory = (category) => {
    dispatch({ type: Actions.SET_SELECTED_CATEGORY, payload: category });
  };

  const clearSelectedCategory = () => {
    dispatch({ type: Actions.CLEAR_SELECTED_CATEGORY });
  };

  return {
    ...state,
    getCategories,
    setSelectedCategory,
    clearSelectedCategory,
  };
};
