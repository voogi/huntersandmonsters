-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('SILVER_BULLET', 'BLOOD_DROP');

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "type" "ResourceType" NOT NULL,
    "playerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
