'use server';
import { prisma } from '../../../prisma';
import { ResourceType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function removeResource(playerId: number, resourceType: ResourceType, quantity: number) {
  const resource: any = await prisma.resource.update({
    where: {
      playerId_type: {
        playerId: playerId,
        type: resourceType,
      },
    },
    data: {
      quantity: {
        decrement: quantity,
      },
    },
  });

  if (resource.quantity < 0) {
    throw new Error('Not enough resources');
  }
  revalidatePath('/board');
  return resource;
}

export async function addResource(playerId: number, resourceType: ResourceType, quantity: number) {
  const resource = await prisma.resource.upsert({
    where: {
      playerId_type: {
        playerId: playerId,
        type: resourceType,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      playerId: playerId,
      type: resourceType,
      quantity: quantity,
    },
  });
  revalidatePath('/board');
  return resource;
}

export async function initializePlayerResources(playerId: number, resourceType: ResourceType) {
  await addResource(playerId, resourceType, 5);
}

export async function getResource(playerId: number) {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        playerId: playerId,
      },
    });

    if (!resources.length) {
      throw new Error(`No resources found for player with ID ${playerId}`);
    }

    return resources;
  } catch (error) {
    console.error('Error fetching player resources:', error);
    throw new Error('Failed to fetch player resources.');
  }
}
