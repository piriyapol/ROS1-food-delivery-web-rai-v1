import React, { useState, useEffect } from "react";
import CustomerInterface from "../components/CustomerInterface";
import { getMenuItems, placeOrder } from "../services/api";

const CustomerPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then((data) => setMenuItems(data));
  }, []);

  return (
    <div>
      {/* <h1>Customer Page</h1> */}
      <CustomerInterface menuItems={menuItems} onOrderSubmit={placeOrder} />
    </div>
  );
};

export default CustomerPage;
