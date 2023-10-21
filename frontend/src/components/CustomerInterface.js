import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { getMenuItems, placeOrder } from "../services/api"; // Import the API functions

function CustomerInterface() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(1);

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
    setSelectedMenuItems((prevItems) => [...prevItems, selectedMenuItem]);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      table_id: tableNumber,
      status: "pending",
      total_price: 0,
      special_requests: "No special requests",
      customer_name: customerName,
      order_items: selectedMenuItems.map((item) => ({
        item_id: item.item_id,
        quantity: 1, // You can allow the customer to choose quantity
      })),
    };

    try {
      const response = await placeOrder(tableNumber, orderData);
      console.log("Order placed successfully:", response);
      // You can add further handling here, such as showing a success message.
    } catch (error) {
      console.error("Error placing the order:", error);
      setError("Failed to place the order.");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
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
                <Button
                  variant="primary"
                  type="button"
                  onClick={handlePlaceOrder}
                >
                  Submit Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
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
                        onClick={() => handleMenuSelection(menuItem.item_id)}
                      >
                        {menuItem.item_name} - ${menuItem.price}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h2>Selected Items</h2>
              <ListGroup>
                {selectedMenuItems.map((item) => (
                  <ListGroup.Item key={item.item_id}>
                    {item.item_name} - ${item.price}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerInterface;
