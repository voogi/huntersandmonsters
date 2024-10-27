import { animate } from 'framer-motion';
import { insertAtIndex } from '@/app/board/board.dnd.helpers';

export const battleAnimation = (selectedCards: any[], onComplete: () => void) => {
  if (selectedCards.length === 2) {
    const [{ ref: ref1, controls: controls1 }, { ref: ref2, controls: controls2 }] = selectedCards;

    const { top: top1, left: left1 } = ref1.getBoundingClientRect();
    const { top: top2, left: left2 } = ref2.getBoundingClientRect();

    Promise.all([
      controls1.start({
        x: (left2 - left1) / 2,
        y: (top2 - top1) / 2,
        transition: { duration: 0.25 },
      }),
      controls2.start({
        x: (left1 - left2) / 2,
        y: (top1 - top2) / 2,
        transition: { duration: 0.25 },
      }),
    ])
      .then(() =>
        Promise.all([
          controls1.start({
            x: (left2 - left1) / 2 + 10,
            y: (top2 - top1) / 2 - 10,
            scale: 1.1,
            transition: { duration: 0.1 },
          }),
          controls2.start({
            x: (left1 - left2) / 2 - 10,
            y: (top1 - top2) / 2 + 10,
            scale: 1.1,
            transition: { duration: 0.1 },
          }),
        ]),
      )
      .then(() =>
        Promise.all([
          controls1.start({
            x: (left2 - left1) / 2,
            y: (top2 - top1) / 2,
            scale: 1,
            transition: { duration: 0.1 },
          }),
          controls2.start({
            x: (left1 - left2) / 2,
            y: (top1 - top2) / 2,
            scale: 1,
            transition: { duration: 0.1 },
          }),
        ]),
      )
      .then(() =>
        Promise.all([
          controls1.start({ x: 0, y: 0, scale: 1, transition: { duration: 0.3 } }),
          controls2.start({ x: 0, y: 0, scale: 1, transition: { duration: 0.3 } }),
        ]),
      )
      .then(() => {
        onComplete();
      });
  }
};

export const playCardAnimation = (cards: any[], event: any, onComplete: () => void) => {
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
      onComplete();
    });
  }
};
