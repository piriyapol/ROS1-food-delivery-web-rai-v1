const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { table_id, status, total_price, special_requests, customer_name } =
    req.body;

  try {
    const order = await prisma.order.create({
      data: {
        table_id,
        status,
        total_price,
        special_requests,
        customer_name,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { table_id, status, total_price, special_requests, customer_name } =
    req.body;

  try {
    const order = await prisma.order.update({
      where: { order_id: parseInt(id) },
      data: {
        table_id,
        status,
        total_price,
        special_requests,
        customer_name,
      },
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  updateOrder,
};
