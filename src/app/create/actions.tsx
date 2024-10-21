'use server';
import { prisma } from '../../../prisma';
import { Card, Rarity } from '@prisma/client';

export async function saveCard(card: any) {
  const newCard: Card = await prisma.card.create({
    data: {
      ...card,
      ability: {},
      rarity: Rarity.EPIC,
      tier: 1,
    },
  });
  console.log(newCard);
}
