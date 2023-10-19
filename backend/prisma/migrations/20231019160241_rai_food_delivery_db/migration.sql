-- CreateTable
CREATE TABLE "TableInformation" (
    "table_id" SERIAL NOT NULL,
    "table_number" TEXT NOT NULL,
    "ros_x_position" DOUBLE PRECISION NOT NULL,
    "ros_y_position" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "capacity" INTEGER,
    "special_requests" TEXT,

    CONSTRAINT "TableInformation_pkey" PRIMARY KEY ("table_id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "table_id" INTEGER NOT NULL,
    "order_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "special_requests" TEXT,
    "customer_name" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "TableInformation"("table_id") ON DELETE RESTRICT ON UPDATE CASCADE;
