/*
  Warnings:

  - A unique constraint covering the columns `[table_number]` on the table `TableInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TableInformation_table_number_key" ON "TableInformation"("table_number");
