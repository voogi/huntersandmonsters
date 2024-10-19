-- DropForeignKey
ALTER TABLE "Deck_Cards" DROP CONSTRAINT "Deck_Cards_deckId_fkey";

-- AddForeignKey
ALTER TABLE "Deck_Cards" ADD CONSTRAINT "Deck_Cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Player_Decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
