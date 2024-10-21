-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "privateP1Data" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "privateP2Data" JSONB NOT NULL DEFAULT '{}';
