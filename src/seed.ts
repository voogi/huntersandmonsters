const { PrismaClient, Rarity } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const cards = [
    {
      name: "Fireball",
      description: "A powerful fire spell.",
      image: "/images/fireball.png",
      ability: { damage: 30, manaCost: 20 },
      health: 50,
      defense: 10,
      attack: 30,
      rarity: Rarity.EPIC,
      tier: 2,
    },
    {
      name: "Ice Blast",
      description: "A freezing attack that slows the enemy.",
      image: "/images/iceblast.png",
      ability: { damage: 20, freezeDuration: 5 },
      health: 40,
      defense: 15,
      attack: 20,
      rarity: Rarity.RARE,
      tier: 3,
    },
    {
      name: "Shield Block",
      description: "Defensive maneuver that blocks attacks.",
      image: "/images/shieldblock.png",
      ability: { blockAmount: 40 },
      health: 100,
      defense: 50,
      attack: 10,
      rarity: Rarity.COMMON,
      tier: 1,
    }
  ];

  for (const card of cards) {
    await prisma.card.create({
      data: card,
    });
  }

  console.log("Adatok sikeresen feltöltve.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
