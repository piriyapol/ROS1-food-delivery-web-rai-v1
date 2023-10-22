import React, { useState, useEffect } from "react";
import KitchenInterface from "../components/KitchenInterface";
import { getKitchenOrders, serveOrder } from "../services/api";

const KitchenPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getKitchenOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {/* <h1>Kitchen Page</h1> */}
      <KitchenInterface orders={orders} onServeOrder={serveOrder} />
    </div>
  );
};

export default KitchenPage;
