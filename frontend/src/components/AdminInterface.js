import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Form, Tab, Tabs } from "react-bootstrap";
import {
  getOrders,
  serveOrder,
  getMenuItems,
  createMenuItemByAdmin,
  updateMenuItemByAdmin,
  deleteMenuItemByAdmin,
  getTables,
  createTableByAdmin,
  updateTableByAdmin,
  deleteTableByAdmin,
  createOrderByAdmin,
  updateOrderByAdmin,
  deleteOrderByAdmin,
} from "../services/api"; // Import your API functions

function AdminInterface() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [showServeModal, setShowServeModal] = useState(false);
  const [showEditMenuModal, setShowEditMenuModal] = useState(false);
  const [showEditTableModal, setShowEditTableModal] = useState(false);
  const [showCreateTableModal, setShowCreateTableModal] = useState(false);
  const [deletingTable, setDeletingTable] = useState(null);
  const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);
  const [showDeleteMenuItemModal, setShowDeleteMenuItemModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [selectedOrder, setSelectedOrder] = useState({
    order_id: 0,
    table_id: 0,
    status: "",
    total_price: 0,
    special_requests: "",
    customer_name: "",
    tableInformation: {
      table_number: "",
      ros_x_position: "",
      ros_y_position: "",
      status: "",
      capacity: 0,
      special_requests: "",
    },
    orderItems: [
      {
        item_id: 0,
        item_name: "",
        description: "",
        price: 0,
        quantity: 0,
      },
    ],
  });

  const [selectedTable, setSelectedTable] = useState({
    table_id: 0,
    table_number: "",
    ros_x_position: "",
    ros_y_position: "",
    status: "",
    capacity: 0,
    special_requests: "",
  });
  const [newTable, setNewTable] = useState({
    table_number: "",
    ros_x_position: "",
    ros_y_position: "",
    status: "",
    capacity: 0,
    special_requests: "",
  });

  const [newMenuItem, setNewMenuItem] = useState({
    item_name: "",
    description: "",
    price: 0,
  });
  const [editedMenuItem, setEditedMenuItem] = useState({
    item_name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
    fetchTables();
  }, []);

  const fetchOrders = () => {
    getOrders().then((data) => setOrders(data));
  };

  const fetchMenuItems = () => {
    getMenuItems().then((data) => setMenuItems(data));
  };

  const fetchTables = () => {
    getTables().then((data) => setTables(data));
  };

  const handleServeOrder = (order) => {
    serveOrder(order.order_id).then(() => {
      fetchOrders();
      setShowServeModal(false);
    });
  };
  
  const handleCreateOrder = (tableId) => {
    setSelectedTable(tableId);
    setShowCreateOrderModal(true);
  };

  const handleUpdateOrder = () => {
    updateOrderByAdmin(selectedOrder.order_id, selectedOrder).then(() => {
      fetchOrders();
    });
  };

  // const handleDeleteOrder = (order) => {
  //   deleteOrderByAdmin(order.order_id).then(() => {
  //     fetchOrders();
  //   });
  // };

  const handleEditMenu = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setEditedMenuItem({
      item_name: menuItem.item_name,
      description: menuItem.description,
      price: menuItem.price,
    });
    setShowEditMenuModal(true);
  };

  const handleUpdateMenuItem = () => {
    updateMenuItemByAdmin(selectedMenuItem.item_id, editedMenuItem).then(() => {
      fetchMenuItems();
      setShowEditMenuModal(false);
    });
  };

  const handleDeleteMenuItem = () => {
    deleteMenuItemByAdmin(selectedMenuItem.item_id).then(() => {
      fetchMenuItems();
      setShowDeleteMenuItemModal(false);
    });
  };

  const handleEditTable = (table) => {
    setSelectedTable(table);
    setShowEditTableModal(true);
  };

  const handleCreateMenu = () => {
    createMenuItemByAdmin(newMenuItem.item_name, newMenuItem).then(() => {
      fetchMenuItems();
      setShowCreateMenuModal(false);
    });
  };

  const handleUpdateTable = () => {
    updateTableByAdmin(selectedTable.table_number, selectedTable).then(() => {
      fetchTables();
      setShowEditTableModal(false);
    });
  };

const handleCreateTable = () => {
  setNewTable({
    table_number: "",
    ros_x_position: 0.00, // Make sure ros_x_position is properly set, e.g., to 0
    ros_y_position: 0.00, // Make sure ros_y_position is properly set, e.g., to 0
    status: "",
    capacity: 0, // Make sure capacity is properly set, e.g., to 0
    special_requests: "",
  });
  setShowCreateTableModal(true);
};


const handleCreateNewTable = () => {
  if (
    newTable.table_number &&
    newTable.ros_x_position !== undefined &&
    newTable.ros_y_position !== undefined &&
    newTable.status &&
    newTable.capacity !== undefined &&
    newTable.special_requests
  ) {
    createTableByAdmin(newTable)
      .then(() => {
        fetchTables();
        setShowCreateTableModal(false);
      })
      .catch((error) => {
        // Handle any API call errors here
        console.error("Error creating table:", error);
      });
  } else {
    // Handle validation errors, e.g., show an alert or error message
    console.error("Validation error: All fields must be filled");
  }
};


const handleDeleteTable = (table) => {
  if (table && table.table_number) {
    deleteTableByAdmin(table.table_number).then(() => {
      fetchTables();
      // You can clear the selectedTable or hide the modal here if necessary.
    });
  } else {
    // Handle the case when the table or table number is missing.
    console.error("Invalid table data");
  }
};


  // const handleAddMenuItem = (menuItem) => {
  //   const orderItems = [...selectedOrder.orderItems];
  //   const existingItemIndex = orderItems.findIndex(
  //     (item) => item.item_id === menuItem.item_id
  //   );

  //   if (existingItemIndex !== -1) {
  //     orderItems[existingItemIndex].quantity++;
  //   } else {
  //     orderItems.push({
  //       item_id: menuItem.item_id,
  //       item_name: menuItem.item_name,
  //       description: menuItem.description,
  //       price: menuItem.price,
  //       quantity: 1,
  //     });
  //   }

  //   setSelectedOrder({
  //     ...selectedOrder,
  //     orderItems,
  //   });
  // };

  // const handleRemoveMenuItem = (itemId) => {
  //   const orderItems = selectedOrder.orderItems.filter(
  //     (item) => item.item_id !== itemId
  //   );

  //   setSelectedOrder({
  //     ...selectedOrder,
  //     orderItems,
  //   });
  // };

  const getMenuItemName = (itemId) => {
    const menuItem = menuItems.find((item) => item.item_id === itemId);
    return menuItem ? menuItem.item_name : "Item Not Found";
  };

  const getMenuItemPrice = (itemId) => {
    const menuItem = menuItems.find((item) => item.item_id === itemId);
    return menuItem ? menuItem.price : 0;
  };

  // const calculateTotalPrice = (orderItems) => {
  //   let total = 0;
  //   for (const item of orderItems) {
  //     total += item.price * item.quantity;
  //   }
  //   return parseFloat(total);
  // };

  return (
    <div>
      {/* <Tabs defaultActiveKey="orders" id="admin-tabs"> */}
      <Tabs defaultActiveKey="menu" id="admin-tabs">
        {/* <Tab eventKey="orders" title="Orders">
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Table Number</th>
                    <th>Status</th>
                    <th>Special Request</th>
                    <th>Customer Name</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>{order.tableInformation.table_number}</td>
                      <td>{order.status}</td>
                      <td>{order.special_requests}</td>
                      <td>{order.customer_name}</td>
                      <td>{parseInt(order.total_price)}</td>
                      <td>
                        {order.status === "pending" && (
                          <Button
                            variant="success"
                            onClick={() => handleServeOrder(order)}
                          >
                            Serve
                          </Button>
                        )}
                        <Button
                          variant="info"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowEditOrderModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteOrder(order)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab> */}
        <Tab eventKey="menu" title="Menu">
          <Card>
            <Card.Body>
              <Button
                variant="primary"
                onClick={() => setShowCreateMenuModal(true)}
              >
                Create Menu Item
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((menuItem) => (
                    <tr key={menuItem.item_id}>
                      <td>{menuItem.item_name}</td>
                      <td>{menuItem.description}</td>
                      <td>{parseInt(menuItem.price)}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditMenu(menuItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setSelectedMenuItem(menuItem);
                            setShowDeleteMenuItemModal(true);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="tables" title="Tables">
          <Card>
            <Card.Body>
              <Button variant="primary" onClick={() => handleCreateTable()}>
                Create Table
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Table Number</th>
                    <th>Capacity</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Special Requests</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table) => (
                    <tr key={table.table_id}>
                      <td>{table.table_number}</td>
                      <td>{table.capacity}</td>
                      <td>
                        {table.ros_x_position}, {table.ros_y_position}
                      </td>
                      <td>{table.status}</td>
                      <td>{table.special_requests}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditTable(table)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteTable(table)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Modal show={showServeModal} onHide={() => setShowServeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Serve Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to serve this order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowServeModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleServeOrder(selectedOrder)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditMenuModal}
        onHide={() => setShowEditMenuModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={editedMenuItem.item_name}
                onChange={(e) =>
                  setEditedMenuItem({
                    ...editedMenuItem,
                    item_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedMenuItem.description}
                onChange={(e) =>
                  setEditedMenuItem({
                    ...editedMenuItem,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editedMenuItem.price}
                onChange={(e) =>
                  setEditedMenuItem({
                    ...editedMenuItem,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditMenuModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateMenuItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCreateMenuModal}
        onHide={() => setShowCreateMenuModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={newMenuItem.item_name}
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    item_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newMenuItem.description}
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newMenuItem.price}
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreateMenuModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateMenu}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteMenuItemModal}
        onHide={() => setShowDeleteMenuItemModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to delete this menu item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteMenuItemModal(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteMenuItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditTableModal}
        onHide={() => setShowEditTableModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="text"
                value={selectedTable.table_number}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    table_number: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={selectedTable.capacity}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    capacity: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>X Position</Form.Label>
              <Form.Control
                type="text"
                value={selectedTable.ros_x_position}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    ros_x_position: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Y Position</Form.Label>
              <Form.Control
                type="text"
                value={selectedTable.ros_y_position}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    ros_y_position: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={selectedTable.status}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    status: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedTable.special_requests}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    special_requests: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditTableModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTable}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCreateTableModal}
        onHide={() => setShowCreateTableModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="text"
                value={newTable.table_number}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    table_number: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={newTable.capacity}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    capacity: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>X Position</Form.Label>
              <Form.Control
                type="text"
                value={newTable.ros_x_position}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    ros_x_position: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Y Position</Form.Label>
              <Form.Control
                type="text"
                value={newTable.ros_y_position}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    ros_y_position: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={newTable.status}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    status: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTable.special_requests}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    special_requests: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreateTableModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateNewTable}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCreateOrderModal}
        onHide={() => setShowCreateOrderModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              />
            </Form.Group>
          </Form>
          <h3>Menu Items:</h3>
          {menuItems &&
            menuItems.map((menuItem) => (
              <div key={menuItem.item_id}>
                <label>
                  {menuItem.item_name} - ฿
                  {parseFloat(menuItem.price).toFixed(2)}
                </label>
                <input
                  type="number"
                  min="0"
                  value={
                    (selectedOrder.orderItems &&
                      selectedOrder.orderItems.find(
                        (item) => item.item_id === menuItem.item_id,
                      )?.quantity) ||
                    0
                  }
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value);
                    const orderItems = (selectedOrder.orderItems || []).map(
                      (item) => {
                        if (item.item_id === menuItem.item_id) {
                          item.quantity = quantity;
                        }
                        return item;
                      },
                    );
                    setSelectedOrder({ ...selectedOrder, orderItems });
                  }}
                />
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreateOrderModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateOrder}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditOrderModal}
        onHide={() => setShowEditOrderModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="text"
                value={selectedOrder.tableInformation.table_number}
                onChange={(e) => {
                  setSelectedOrder({
                    ...selectedOrder,
                    tableInformation: {
                      ...selectedOrder.tableInformation,
                      table_number: e.target.value,
                    },
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedOrder.customer_name}
                onChange={(e) => {
                  setSelectedOrder({
                    ...selectedOrder,
                    customer_name: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedOrder.special_requests}
                onChange={(e) => {
                  setSelectedOrder({
                    ...selectedOrder,
                    special_requests: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
          <h3>Menu Items:</h3>
          {selectedOrder.orderItems &&
            selectedOrder.orderItems.map((item) => (
              <div key={item.item_id}>
                <label>
                  {getMenuItemName(item.item_id)} - ฿
                  {getMenuItemPrice(item.item_id).toFixed(2)}
                </label>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value);
                    const orderItems = selectedOrder.orderItems.map((i) => {
                      if (i.item_id === item.item_id) {
                        i.quantity = quantity;
                      }
                      return i;
                    });
                    setSelectedOrder({ ...selectedOrder, orderItems });
                  }}
                />
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditOrderModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateOrder}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminInterface;
