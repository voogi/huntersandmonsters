-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "ability" JSONB NOT NULL,
    "health" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "tier" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
