const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTables = async (req, res) => {
  try {
    const tables = await prisma.tableInformation.findMany();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTable = async (req, res) => {
  const {
    table_number,
    ros_x_position,
    ros_y_position,
    status,
    capacity,
    special_requests,
  } = req.body;

  try {
    const table = await prisma.tableInformation.create({
      data: {
        table_number,
        ros_x_position,
        ros_y_position,
        status,
        capacity,
        special_requests,
      },
    });
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTable = async (req, res) => {
  const { id } = req.params;
  const {
    table_number,
    ros_x_position,
    ros_y_position,
    status,
    capacity,
    special_requests,
  } = req.body;

  try {
    const table = await prisma.tableInformation.update({
      where: { table_id: parseInt(id) },
      data: {
        table_number,
        ros_x_position,
        ros_y_position,
        status,
        capacity,
        special_requests,
      },
    });
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTables,
  createTable,
  updateTable,
};
