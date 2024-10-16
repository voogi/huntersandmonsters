export interface Card {
  id: number;
  name: string;
  description: string;
  image: string;
  ability: any;
  health: number;
  defense: number;
  attack: number;
  rarity: Rarity;
  tier: number;
}

export enum Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
}
