const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  const {
    table_id,
    status,
    total_price,
    special_requests,
    customer_name,
    order_items,
  } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        table_id,
        status,
        total_price,
        special_requests,
        customer_name,
        OrderItem: {
          create: order_items,
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
    console.error("Error creating order:", error); // Log the error
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
        order_items: {
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
