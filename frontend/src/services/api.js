import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Update with your actual API URL

export const getMenuItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/menu/menu-items`);
  return response.data;
};

export const placeOrder = async (tableNumber, orderData) => {
  const response = await axios.post(`${API_BASE_URL}/api/orders/orders`, {
    tableNumber,
    orderData,
  });
  return response.data;
};

export const getKitchenOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/kitchen/orders`);
  return response.data;
};

export const serveOrder = async (orderId) => {
  const response = await axios.post(`${API_BASE_URL}/api/kitchen/serve`, {
    orderId,
  });
  return response.data;
};
