const BaseURL = "https://kyuna-backend.vercel.app/api";

const API_URLS = {
  LOGIN: `${BaseURL}/auth/login`,
  REGISTER: `${BaseURL}/auth/user/register`,
  ITEMS: `${BaseURL}/items`,
  IMAGE: `${BaseURL}/image`,
  ORDERS: `${BaseURL}/orders`,
  MY_ORDERS: `${BaseURL}/orders/my-orders`,
  ORDER_BY_ID: (orderId) => `${BaseURL}/orders/${orderId}`,
  CANCEL_ORDER: (orderId) => `${BaseURL}/orders/${orderId}/cancel`,
  QUERIES: `${BaseURL}/queries`,
  CATEGORIES: `${BaseURL}/categories`,
};

export default API_URLS;
