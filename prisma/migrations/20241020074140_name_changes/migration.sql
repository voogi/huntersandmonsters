/*
  Warnings:

  - You are about to drop the column `deckName` on the `Player_Decks` table. All the data in the column will be lost.
  - You are about to drop the `Deck_Cards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Player_Decks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deck_Cards" DROP CONSTRAINT "Deck_Cards_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Deck_Cards" DROP CONSTRAINT "Deck_Cards_deckId_fkey";

-- AlterTable
ALTER TABLE "Player_Decks" DROP COLUMN "deckName",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Deck_Cards";

-- CreateTable
CREATE TABLE "Deck_Card" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Deck_Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deck_Card" ADD CONSTRAINT "Deck_Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Player_Decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck_Card" ADD CONSTRAINT "Deck_Card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
