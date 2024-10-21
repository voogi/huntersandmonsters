/*
  Warnings:

  - You are about to drop the column `defense` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "defense",
ADD COLUMN     "cost" INTEGER NOT NULL DEFAULT 0;
