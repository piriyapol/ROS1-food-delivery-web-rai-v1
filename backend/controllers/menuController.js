// menuController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMenuItems,
};
