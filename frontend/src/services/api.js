import axios from "axios";

const API_BASE_URL = process.env.BACKEND_API_BASE_URL || "http://localhost:3000"; // Update the URL of your backend API if needed

export const getMenuItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/menu/menu-items`);
  return response.data;
};

export const placeOrder = async (tableNumber, orderData) => {
  const response = await axios.post(`${API_BASE_URL}/api/orders`, {
    tableNumber,
    orderData,
  });
  return response.data;
};

export const getKitchenOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/orders`);
  return response.data;
};

export const serveOrder = async (orderId) => {
  const response = await axios.put(`${API_BASE_URL}/api/orders/${orderId}/serve`);
  return response.data;
};

export const getTables = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/tables/lists`);
  return response.data;
};

export const createTableByAdmin = async (tableData) => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/table/create`, {
    tableNumber: tableData.table_number,
    ros_x_position: tableData.ros_x_position,
    ros_y_position: tableData.ros_y_position,
    status: tableData.status,
    capacity: tableData.capacity,
    specialRequests: tableData.specialRequests,
  });
  return response.data;
};

export const updateTableByAdmin = async (tableNumber,tableInformation) => {
  const response = await axios.put(`${API_BASE_URL}/api/admin/table/update/${tableNumber}`, {
    tableNumber,
    ros_x_position : tableInformation.ros_x_position,
    ros_y_position : tableInformation.ros_y_position,
    status : tableInformation.status,
    capacity : tableInformation.capacity,
    specialRequests : tableInformation.specialRequests,
  });
  return response.data;
}

export const deleteTableByAdmin = async (tableNumber) => {
  const response = await axios.delete(`${API_BASE_URL}/api/admin/table/delete/${tableNumber}`);
  return response.data;
}

export const createMenuItemByAdmin = async (item_name,MenuInformation) => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/menu/create`, {
    item_name,
    description : MenuInformation.description,
    price : MenuInformation.price,
  });
  return response.data;
};

export const updateMenuItemByAdmin = async (item_id,MenuInformation) => {
  const response = await axios.put(`${API_BASE_URL}/api/admin/menu/update/${item_id}`, {
    item_name : MenuInformation.item_name,
    description : MenuInformation.description,
    price : MenuInformation.price,
  });
  return response.data;
}

export const deleteMenuItemByAdmin = async (item_id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/admin/menu/delete/${item_id}`);
  return response.data;
} 

export const getOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/orders`);
  return response.data;
};

export const updateOrderByAdmin = async (order_id,orderInformation) => {
  const response = await axios.put(`${API_BASE_URL}/api/admin/order/update/${order_id}`, {
    order_id,
    status : orderInformation.status,
    total_price : orderInformation.total_price,
    specialRequests : orderInformation.specialRequests,
    customerName : orderInformation.customerName,
    orderItems : orderInformation.orderItems,
  });
  return response.data;
}

export const deleteOrderByAdmin = async (order_id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/admin/order/delete/${order_id}`);
  return response.data;
}

export const createOrderByAdmin = async (orderInformation) => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/order/create`, {
    status : orderInformation.status,
    total_price : orderInformation.total_price,
    specialRequests : orderInformation.specialRequests,
    customerName : orderInformation.customerName,
    orderItems : orderInformation.orderItems,
  });
  return response.data;
}

export const getTableByAdmin = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/table/lists`);
  return response.data;
};

export const getMenuItemByAdmin = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/menu/menu-items`);
  return response.data;
};

export const getOrderByAdmin = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/orders`);
  return response.data;
};
