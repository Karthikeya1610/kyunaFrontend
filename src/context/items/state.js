import { useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";
import { Actions } from "./actions";
import API_URLS from "../../config/api";

export const initialState = {
  products: null,
};

export const ItemState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getItems = async (page = 1, append = false, searchTerm = "") => {
    try {
      dispatch({ type: Actions.SET_LOADING, payload: true });

      let url = API_URLS.ITEMS;
      const params = new URLSearchParams();

      if (searchTerm) {
        params.append("q", searchTerm);
        params.append("page", page);
        params.append("limit", 10);
        url = `${API_URLS.ITEMS}/search?${params.toString()}`;
      } else {
        params.append("page", page);
        params.append("limit", 10);
        url = `${API_URLS.ITEMS}?${params.toString()}`;
      }
      ``;

      const response = await axios.get(url);

      dispatch({
        type: Actions.GET_ITEMS,
        payload: response.data,
        append: append,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      return error;
    } finally {
      dispatch({ type: Actions.SET_LOADING, payload: false });
    }
  };

  const getItemsId = async (id) => {
    try {
      const response = await axios.get(`${API_URLS.ITEMS}/${id}`);
      dispatch({ type: Actions.GET_ITEMS_ID, payload: response.data });
      console.log("Item fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching item by ID:", error);
      return error;
    }
  };

  const getItemsCreate = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URLS.ITEMS, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_ITEMS_CREATE, payload: response.data.item });
      console.log("Item created successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating item:", error);
      return error;
    }
  };

  const getItemsUpdate = async (id, payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URLS.ITEMS}/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_ITEMS_UPDATE, payload: response.data });
      console.log("Item updated successfully", response);
      return response.data;
    } catch (error) {
      console.error("Error updating item:", error);
      return error;
    }
  };

  const getItemsDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URLS.ITEMS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_ITEM_DELETE, payload: response.data });
      console.log("Item deleted successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting item:", error);
      return error;
    }
  };

  return {
    ...state,
    getItems,
    getItemsId,
    getItemsCreate,
    getItemsUpdate,
    getItemsDelete,
  };
};
