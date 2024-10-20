'use server';
import { prisma } from '../../../prisma';


export async function saveCard(card: any) {
  const newCard = await prisma.card.create({
    data: {
      name: card.name,
      description: card.description,
      attack: Number(card.attack),
      defense: Number(card.defense),
      health: Number(card.health),
    },
  });
}
