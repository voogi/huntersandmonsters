-- CreateEnum
CREATE TYPE "BattleEvent" AS ENUM ('DRAW_CARD', 'PLAY_CARD', 'ATTACK_CARD', 'PASS', 'REORDER_BOARD');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "battleId" INTEGER NOT NULL,
    "battleEvent" "BattleEvent" NOT NULL,
    "eventData" JSONB NOT NULL DEFAULT '{}',
    "cardId" INTEGER,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
