const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.resource.create({
    data: {
      type: 'SILVER_BULLET',
      quantity: 5,
      playerId: 1,
    },
  });

  console.log('Adatok sikeresen feltöltve.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
