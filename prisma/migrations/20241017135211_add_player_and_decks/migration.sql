-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player_Cards" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Player_Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player_Decks" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "deckName" TEXT NOT NULL,

    CONSTRAINT "Player_Decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck_Cards" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Deck_Cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player_Cards" ADD CONSTRAINT "Player_Cards_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player_Decks" ADD CONSTRAINT "Player_Decks_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck_Cards" ADD CONSTRAINT "Deck_Cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Player_Decks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
