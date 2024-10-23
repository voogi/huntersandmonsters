import { Card } from '@prisma/client';

export enum Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
}

export const rarityOptions = [
  { key: '', label: 'All' },
  { key: 'COMMON', label: 'Common' },
  { key: 'RARE', label: 'Rare' },
  { key: 'EPIC', label: 'Epic' },
  { key: 'LEGENDARY', label: 'Legendary' },
];


export interface BattleState {
  boardCards: Card[];
  opponentBoardCards: Card[];
}

export interface PrivateData {
  cards: Card[];
  deck: Card[];
}