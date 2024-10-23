import { Card, Rarity } from '@/app/models';

export function generateRandomCode() {
  const n: string = (Math.random() * 0xfffff * 1000000).toString(16);
  return n.slice(0, 6);
}

const generateUniqueId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const generateCards = (count: number, image = '/wolf.webp'): Card[] => {
  const cards: Card[] = [];

  for (let i = 0; i < count; i++) {
    cards.push({
      id: generateUniqueId(),
      name: `Card ${i + 1}`,
      description: `This is the description for Card ${i + 1}`,
      image: image,
      ability: null,
      health: Math.floor(Math.random() * 100) + 1,
      defense: Math.floor(Math.random() * 50) + 1,
      attack: Math.floor(Math.random() * 75) + 1,
      tier: 1,
      rarity: Rarity.COMMON,
    });
  }

  return cards;
};

export function moveInArray(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}
