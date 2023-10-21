import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { getMenuItems, placeOrder } from "../services/api";

function CustomerInterface() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [orderReceipt, setOrderReceipt] = useState(null);

  useEffect(() => {
    // Load selected items from local storage when the component mounts
    const storedSelectedItems = JSON.parse(
      localStorage.getItem("selectedMenuItems"),
    );
    if (storedSelectedItems) {
      setSelectedMenuItems(storedSelectedItems);
    }
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = selectedMenuItems.map((item) => {
      if (item.item_id === itemId) {
        const parsedQuantity = parseInt(newQuantity, 10);
        if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
          item.quantity = parsedQuantity;
        }
        return item;
      }
      return item;
    });

    setSelectedMenuItems(updatedItems);
    // Save updated selected items in local storage
    localStorage.setItem("selectedMenuItems", JSON.stringify(updatedItems));
  };

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await getMenuItems();
        if (Array.isArray(response)) {
          setMenuItems(response);
        } else {
          console.error("Invalid menu data received:", response);
          setError("Invalid menu data received.");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Failed to fetch menu items.");
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const handleMenuSelection = (itemId) => {
    const selectedMenuItem = menuItems.find((item) => item.item_id === itemId);
    const existingItem = selectedMenuItems.find(
      (item) => item.item_id === itemId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
      setSelectedMenuItems([...selectedMenuItems]);
    } else {
      setSelectedMenuItems([
        ...selectedMenuItems,
        { ...selectedMenuItem, quantity: 1 },
      ]);
    }
    // Save updated selected items in local storage
    localStorage.setItem(
      "selectedMenuItems",
      JSON.stringify(selectedMenuItems),
    );
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedItems = selectedMenuItems.map((item) => {
      if (item.item_id === itemId) {
        item.quantity += 1;
      }
      return item;
    });

    setSelectedMenuItems(updatedItems);
    // Save updated selected items in local storage
    localStorage.setItem("selectedMenuItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedItems = selectedMenuItems.map((item) => {
      if (item.item_id === itemId) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    setSelectedMenuItems(updatedItems);
    // Save updated selected items in local storage
    localStorage.setItem("selectedMenuItems", JSON.stringify(updatedItems));
  };

  const handleRemoveMenuItem = (itemId) => {
    const updatedItems = selectedMenuItems.filter(
      (item) => item.item_id !== itemId,
    );
    setSelectedMenuItems(updatedItems);
    // Save updated selected items in local storage
    localStorage.setItem("selectedMenuItems", JSON.stringify(updatedItems));
  };

  const handlePlaceOrder = async () => {
    if (selectedMenuItems.length === 0) {
      setOrderError("Please select at least one item before placing an order.");
      setShowModal(true);
      return;
    }

    // Calculate the total price and price per unit for each ordered item
    let totalPrice = 0;
    selectedMenuItems.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
      item.pricePerUnit = itemPrice / item.quantity;
    });

    const orderData = {
      table_id: tableNumber,
      status: "pending",
      total_price: totalPrice, // Include the total price in the order data
      specialRequests: specialRequests,
      customerName: customerName,
      orderItems: selectedMenuItems.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await placeOrder(tableNumber, orderData);
      console.log("Order placed successfully:", response);
      setOrderPlaced(true);
      setOrderError(null);
      // Prepare the order receipt
      setOrderReceipt({
        tableNumber: tableNumber,
        customerName: customerName,
        specialRequests: specialRequests,
        orderedItems: selectedMenuItems,
        totalPrice: totalPrice,
      });
      setShowModal(true);
      // Clear selected items and remove from local storage
      setSelectedMenuItems([]);
      localStorage.removeItem("selectedMenuItems");
    } catch (error) {
      console.error("Error placing the order:", error);
      setOrderPlaced(false);
      setOrderError(error.response?.data?.error || "Failed to place the order");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const totalOrderPrice = selectedMenuItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Container>
      <Row>
        <Col lg={6} md={12}>
          {orderPlaced ? (
            <div>
              <h2>Order Placed</h2>
              <p>Your order has been placed successfully. Thank you!</p>
              <Button
                variant="primary"
                onClick={() => {
                  setOrderPlaced(false);
                  setOrderReceipt(null);
                }}
              >
                Place New Order
              </Button>
            </div>
          ) : (
            <Card>
              <Card.Body>
                <h2>Customer Interface</h2>
                <Form>
                  <Form.Group controlId="tableNumber">
                    <Form.Label>Table Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter table number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="customerName">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="specialRequests">
                    <Form.Label>Special Requests</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter special requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant="primary"
                  type="button"
                  onClick={handlePlaceOrder}
                >
                  Submit Order
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
        {!orderPlaced && (
          <>
            <Col lg={3} md={12}>
              <Card>
                <Card.Body>
                  <h2>Menu</h2>
                  {loading ? (
                    <p>Loading menu items...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <ListGroup>
                      {menuItems.map((menuItem) => (
                        <ListGroup.Item key={menuItem.item_id}>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleMenuSelection(menuItem.item_id)
                            }
                          >
                            {menuItem.item_name} - ฿{menuItem.price}
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={12}>
              <Card>
                <Card.Body>
                  <h2>Selected Items</h2>
                  <ListGroup>
                    {selectedMenuItems.map((item) => (
                      <ListGroup.Item key={item.item_id}>
                        {item.item_name} - ฿{item.price} - Quantity:
                        <input
                          style={{ width: "50px", margin: "0 10px" }}
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.item_id, e.target.value)
                          }
                        />
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleIncreaseQuantity(item.item_id)}
                        >
                          +
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleDecreaseQuantity(item.item_id)}
                        >
                          -
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveMenuItem(item.item_id)}
                        >
                          Remove
                        </Button>
                      </ListGroup.Item>
                    ))}
                    {selectedMenuItems.length > 0 && (
                      <ListGroup.Item>
                        Total Price: ฿{totalOrderPrice.toFixed(2)}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {orderPlaced ? "Order Placed" : "Order Failed"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderPlaced ? (
            <div>
              <h2>Order Receipt</h2>
              <p>Table Number: {orderReceipt.tableNumber}</p>
              <p>Customer Name: {orderReceipt.customerName}</p>
              <p>Special Requests: {orderReceipt.specialRequests}</p>
              <ul>
                {orderReceipt.orderedItems.map((item) => (
                  <li key={item.item_id}>
                    {item.item_name} - Quantity: {item.quantity}
                    Price per Unit: ฿{item.pricePerUnit.toFixed(2)}
                  </li>
                ))}
              </ul>
              <h4>Total Price: ฿{orderReceipt.totalPrice.toFixed(2)}</h4>
              <Button
                variant="primary"
                onClick={() => {
                  setOrderPlaced(false);
                  setOrderReceipt(null);
                }}
              >
                Place New Order
              </Button>
            </div>
          ) : (
            <p>{orderError}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CustomerInterface;
