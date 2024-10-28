import { animate } from 'framer-motion';
import { insertAtIndex } from '@/app/board/board.dnd.helpers';
import { Card } from '@prisma/client';

export const battleAnimation = (event: any, onComplete: () => void) => {
  const ref1: any = document.getElementById('card-' + event.id);
  const ref2: any = document.getElementById('card-' + event.targetId);

  const { top: top1, left: left1 } = ref1?.getBoundingClientRect();
  const { top: top2, left: left2 } = ref2?.getBoundingClientRect();

  animate([
    [ref1, { y: (top2 - top1) / 2, x: (left2 - left1) / 2 }, { duration: 0.25 }],
    [ref2, { y: (top1 - top2) / 2, x: (left1 - left2) / 2 }, { duration: 0.25 }],

    [ref1, { x: (left2 - left1) / 2 + 10, y: (top2 - top1) / 2 - 10, scale: 1.1 }, { duration: 0.1 }],
    [ref2, { x: (left1 - left2) / 2 - 10, y: (top1 - top2) / 2 + 10, scale: 1.1 }, { duration: 0.1 }],

    [ref1, { x: (left2 - left1) / 2, y: (top2 - top1) / 2, scale: 1 }, { duration: 0.1 }],
    [ref2, { x: (left1 - left2) / 2, y: (top1 - top2) / 2, scale: 1 }, { duration: 0.1 }],

    [ref1, { x: 0, y: 0, scale: 1 }, { duration: 0.3 }],
    [ref2, { x: 0, y: 0, scale: 1 }, { duration: 0.3 }],
  ]).then(() => {
    onComplete();
  });
};

export const playCardAnimation = (cards: any[], event: any, onComplete: (newOppCards: Card[]) => void) => {
  const cardDiv = document.getElementById('card-' + event.eventData.card.id);
  let targetX = 0;
  let targetY = 200;
  if (cards.length > 0) {
    const targetId = cards[event.eventData.newIndex].id;
    const targetDiv = document.getElementById('card-' + targetId)?.getBoundingClientRect();
    const sourceRect = cardDiv?.getBoundingClientRect();
    if (targetDiv && sourceRect) {
      targetX = targetDiv.x - sourceRect.x;
      targetY = targetDiv.y - sourceRect.y;
    }
  }

  if (cardDiv) {
    animate([
      [cardDiv, { y: [0, targetY], x: [0, targetX] }, { type: 'tween' }],
      [cardDiv, { opacity: 0 }],
    ]).then(() => {
      cards = insertAtIndex(cards, event.eventData.newIndex, event.eventData.card);
      onComplete(cards);
    });
  }
};
