import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Player } from '@prisma/client';
import { Button } from '@nextui-org/react';
import { addCardToDeck, removeCardFromDeck } from '@/app/collection/actions';

type CollectionItemProps = {
  card: Card;
  player: Player;
  inDeck: boolean;
};

export default function CollectionItem({ card, player, inDeck }: CollectionItemProps) {
  const [isCentered, setIsCentered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const itemRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      setCardDimensions({ width: rect.width, height: rect.height });
    }
    setIsCentered(!isCentered);
  };

  const addCard = () => {
    addCardToDeck(player.editedDeckId, card.id, 1);
  };

  const removeCard = () => {
    removeCardFromDeck(player.editedDeckId, card.id);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isCentered && animationRef.current && !animationRef.current.contains(event.target as Node)) {
        setIsCentered(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isCentered]);

  return (
    <>
      <div
        ref={itemRef}
        onClick={handleClick}
        className={classNames(
          'cursor-pointer h-56 w-44 rounded-md bg-cover bg-center relative justify-center flex items-end pb-4',
        )}
        style={{ backgroundImage: `url(${card.image})` }}
      >
        {inDeck && (
          <Button onPress={removeCard} size={'md'} color="primary">
            Remove
          </Button>
        )}
        {!inDeck && (
          <Button onPress={addCard} size={'md'} color="primary">
            Add
          </Button>
        )}
      </div>

      {isCentered && (
        <motion.div
          ref={animationRef}
          initial={{ x: position.x, y: position.y, scale: 1 }}
          animate={{
            x: `calc(50vw - ${cardDimensions.width / 2}px)`,
            y: `calc(50vh - ${cardDimensions.height / 2}px)`,
            scale: 3,
          }}
          transition={{ type: 'spring', stiffness: 100 }}
          style={{
            position: 'fixed',
            width: 'auto',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            zIndex: 1000,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            onClick={handleClick}
            className={classNames('h-48 bg-white w-36 rounded-md bg-cover bg-center cursor-pointer')}
            style={{ backgroundImage: `url(${card.image})` }}
          />
        </motion.div>
      )}
    </>
  );
}
