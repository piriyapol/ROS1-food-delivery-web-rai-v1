const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Separate function to find table information
const findTableInformation = async (tableNumber, prisma) => {
    return prisma.tableInformation.findUnique({
        where: {
            table_number: tableNumber,
        },
    });
};

// get all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await prisma.menuItem.findMany();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error getting menu items:", error);
        res.status(500).json({ error: "Internal server error (Get Menu Items)" });
    }
};

// Create a new menu item
const createMenuItem = async (req, res) => {
  const { item_name, description, price } = req.body;

  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        item_name,
        description,
        price,
      },
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal server error (Create Menu Item)" });
  }
};

// Update an existing menu item
const updateMenuItem = async (req, res) => {
  const { item_id } = req.params;
  const { item_name, description, price } = req.body;

  try {
    const menuItem = await prisma.menuItem.update({
      where: {
        item_id: Number(item_id),
      },
      data: {
        item_name,
        description,
        price,
      },
    });

    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Internal server error (Update Menu Item)" });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  const { item_id } = req.params;

  try {
    await prisma.menuItem.delete({
      where: {
        item_id: Number(item_id),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Internal server error (Delete Menu Item)" });
  }
};

// Retrieve a list of tables
const getTables = async (req, res) => {
    try {
        const tables = await prisma.tableInformation.findMany();
        res.status(200).json(tables);
    } catch (error) {
        console.error("Error getting tables:", error);
        res.status(500).json({ error: "Internal server error (Get Tables)" });
    }
    };

// Create a new table information
const createTableInformation = async (req, res) => {
  const {
    tableNumber,
    ros_x_position,
    ros_y_position,
    status,
    capacity,
    special_requests,
  } = req.body;

  try {
    const tableInfo = await prisma.tableInformation.create({
      data: {
        table_number: tableNumber,
        ros_x_position: parseFloat(ros_x_position),
        ros_y_position  : parseFloat(ros_y_position),
        status,
        capacity : parseInt(capacity),
        special_requests,
      },
    });

    res.status(201).json(tableInfo);
  } catch (error) {
    console.error("Error creating table information:", error);
    res
      .status(500)
      .json({ error: "Internal server error (Create Table Information)" });
  }
};

// Update existing table information
const updateTableInformation = async (req, res) => {
  const { table_number } = req.params;
  const updatedTableInfo = req.body;

  try { //Update table information where table_number = tableNumber
    const tableInfo = await prisma.tableInformation.update({
      where: {
        table_number: table_number,
      },
      data: {
        ros_x_position: parseFloat(updatedTableInfo.ros_x_position),
        ros_y_position: parseFloat(updatedTableInfo.ros_y_position),
        status: updatedTableInfo.status,
        capacity: parseInt(updatedTableInfo.capacity),
        special_requests: updatedTableInfo.special_requests,
      },
    });

    res.status(200).json(tableInfo);
  } catch (error) { //Error updating table information
    console.error("Error updating table information:", error);
    res
      .status(500)
      .json({ error: "Internal server error (Update Table Information)" });
  }
};

// Delete table information
const deleteTableInformation = async (req, res) => {
  const { table_number } = req.params;

  try {
    // Delete all records with the provided table_number
    await prisma.tableInformation.delete({
      where: {
        table_number: table_number,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting table information:", error);
    res
      .status(500)
      .json({ error: "Internal server error (Delete Table Information)"});
  }
};


// Retrieve a list of orders
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        tableInformation: true,
        OrderItem: {
          include: {
            menu_item: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Modify an order (e.g., update status)
const modifyOrder = async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  try {
    const order = await prisma.order.update({
      where: {
        order_id: Number(order_id),
      },
      data: {
        status,
      },
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error modifying order:", error);
    res.status(500).json({ error: "Internal server error (Modify Order)" });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { tableNumber, orderData } = req.body;

  try {
    const tableNumberStr = tableNumber.toString();
    logTableId(tableNumberStr, prisma);

    const tableInfo = await findTableInformation(tableNumberStr, prisma);

    if (!tableInfo) {
      return res.status(404).json({ error: "Table not found" });
    }

    const order = await prisma.order.create({
      data: {
        table_id: tableInfo.table_id,
        status: orderData.status,
        total_price: orderData.total_price,
        special_requests: orderData.specialRequests,
        customer_name: orderData.customerName,
        OrderItem: {
          create: orderData.orderItems.map((item) => ({
            menu_item: {
              connect: { item_id: item.item_id },
            },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        tableInformation: true,
        OrderItem: {
          include: {
            menu_item: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error (Create Order)" });
  }
};

// Remove an order
const removeOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const order = await prisma.order.delete({
      where: {
        order_id: Number(order_id),
      },
    });

    res.status(204).json(order);
  } catch (error) {
    console.error("Error removing order:", error);
    res.status(500).json({ error: "Internal server error (Remove Order)" });
  }
};

module.exports = {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getTables,
    createTableInformation,
    updateTableInformation,
    deleteTableInformation,
    getOrders,
    modifyOrder,
    createOrder,
    removeOrder,
    };