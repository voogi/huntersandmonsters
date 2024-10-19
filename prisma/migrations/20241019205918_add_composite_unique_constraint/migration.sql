/*
  Warnings:

  - A unique constraint covering the columns `[playerId,type]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resource_playerId_type_key" ON "Resource"("playerId", "type");
