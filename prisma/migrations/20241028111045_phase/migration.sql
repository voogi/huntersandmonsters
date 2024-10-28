-- CreateEnum
CREATE TYPE "BattlePhase" AS ENUM ('DRAW_PHASE', 'PLANNING_PHASE', 'BATTLE_PHASE', 'END_PHASE');

-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "actualPLayerId" INTEGER,
ADD COLUMN     "phase" "BattlePhase" NOT NULL DEFAULT 'DRAW_PHASE';
