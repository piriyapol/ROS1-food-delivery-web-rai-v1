import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button, Form } from "react-bootstrap";
import { getKitchenOrders, serveOrder } from "../services/api";

function KitchenInterface() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("order_id");
  const [filterOption, setFilterOption] = useState("all");

  const fetchOrders = async () => {
    try {
      const response = await getKitchenOrders();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServeOrder = async (orderId) => {
    try {
      await serveOrder(orderId);
      // After serving the order, refresh the order list
      fetchOrders();
    } catch (error) {
      console.error("Error serving the order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filterOption === "all") {
      return true;
    }
    return order.status === filterOption;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortOption === "order_id") {
      return a.order_id - b.order_id;
    }
    return a.order_time.localeCompare(b.order_time);
  });

  return (
    <div>
      <h2>Kitchen Interface</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Sort By:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="order_id">Order ID</option>
            <option value="order_time">Order Time</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Filter By Status:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="served">Served</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {loading ? (
        <p>Loading orders...</p>
      ) : sortedOrders.length === 0 ? (
        <p>No matching orders</p>
      ) : (
        <ListGroup>
          {sortedOrders.map((order) => (
            <Card key={order.order_id} className="mb-3">
              <Card.Body>
                <Card.Title>Order ID: {order.order_id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Table {order.tableInformation.table_number}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Customer Name: </strong>
                  {order.customer_name || "Guest"}
                </Card.Text>
                <Card.Text>
                  <strong>Special Requests: </strong>
                  {order.special_requests || "None"}
                </Card.Text>
                <Card.Text>
                  <strong>Status: </strong>
                  {order.status}
                </Card.Text>
                <Card.Text>
                  <strong>Ordered Items:</strong>
                </Card.Text>
                <ListGroup>
                  {order.OrderItem.map((item) => (
                    <ListGroup.Item key={item.order_item_id}>
                      {item.menu_item.item_name} - Quantity: {item.quantity}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
              <Card.Footer>
                {order.status === "pending" ? (
                  <Button
                    variant="success"
                    onClick={() => handleServeOrder(order.order_id)}
                  >
                    Serve
                  </Button>
                ) : (
                  <span className="text-success">Served</span>
                )}
              </Card.Footer>
            </Card>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default KitchenInterface;
