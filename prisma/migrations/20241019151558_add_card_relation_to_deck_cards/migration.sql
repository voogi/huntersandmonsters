-- AddForeignKey
ALTER TABLE "Deck_Cards" ADD CONSTRAINT "Deck_Cards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;