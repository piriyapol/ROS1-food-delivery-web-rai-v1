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


// Log the table_id when createOrder is called
const logTableId = async (tableNumber) => {
  try {
    // Convert the tableNumber to a string (if it's not already)
    const tableNumberStr = tableNumber.toString();

    // Debug: Print the tableNumber
    console.log("Table Number:", tableNumberStr);

    // Log the where clause
    console.log("Where Clause:", {
      table_number: tableNumberStr,
    });

    const tableInfo = await findTableInformation(tableNumberStr, prisma);

    // Debug: Print the table_id if found
    if (tableInfo) {
      console.log("Table ID:", tableInfo.table_id);
    } else {
      console.log("Table not found");
    }
  } catch (error) {
    console.error("Error logging table_id:", error);
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { tableNumber, orderData } = req.body;

  try {
    const tableNumberStr = tableNumber.toString();
    console.log("Table Number:", tableNumberStr);
    logTableId(tableNumberStr, prisma);

    const tableInfo = await findTableInformation(tableNumberStr, prisma);
    console.log("Table Information:", tableInfo);

    if (!tableInfo) {
      return res.status(404).json({ error: "Table not found" });
    }

    const order = await prisma.order.create({
      data: {
        table_id: tableInfo.table_id,
        status: orderData.status,
        total_price: orderData.total_price,
        special_requests: orderData.special_requests,
        customer_name: orderData.customer_name,
        OrderItem: {
          // Use "OrderItem" instead of "order_items"
          create: orderData.order_items,
        },
      },
      include: {
        tableInformation: true,
        OrderItem: {
          // Use "OrderItem" instead of "order_items"
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

// Serve an order (update its status)
const serveOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const order = await prisma.order.update({
      where: {
        order_id: Number(order_id),
      },
      data: {
        status: "served",
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

    res.status(200).json(order);
  } catch (error) {
    console.error("Error serving order:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  serveOrder,
};
