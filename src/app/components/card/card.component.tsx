import { motion, useAnimation } from 'framer-motion';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { PlayerType } from '@/app/models';

export function CardComponent({
  card,
  onlyImg,
  enableAnimation = true,
  enableSelection = true,
  onClick,
  type,
  selectedCards,
}: {
  card: any;
  onlyImg?: boolean;
  enableAnimation: boolean;
  enableSelection: boolean;
  onClick?: any;
  selectedCards: any;
  type: PlayerType;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectable, setIsSelectable] = useState(true);

  useEffect(() => {
    if (isSelected) {
      controls.start({
        y: [0, -10, 0],
        boxShadow: '0px 8px 16px rgba(0,0,0,0.6)',
        transition: { duration: 0.8, repeat: Infinity, repeatType: 'loop' },
      });
    } else {
      controls.stop();
      controls.start({ y: 0, boxShadow: '0px 2px 4px rgba(0,0,0,0.6)' });
    }
  }, [isSelected, controls]);

  useEffect(() => {
    const playerSelected = selectedCards?.some((selected: any) => selected.type === PlayerType.PLAYER);
    const opponentSelected = selectedCards?.some((selected: any) => selected.type === PlayerType.OPPONENT);

    if (selectedCards?.length === 0) {
      setIsSelectable(true);
    } else {
      setIsSelectable(
        (type === PlayerType.PLAYER && !playerSelected) || (type === PlayerType.OPPONENT && !opponentSelected),
      );
    }
  }, [selectedCards, type]);

  useEffect(() => {
    if (selectedCards?.length === 0) {
      setIsSelected(false);
    }
  }, [selectedCards]);

  const handleCardClick = () => {
    if(!enableSelection) {
      return;
    }
    const isAlreadySelected = selectedCards?.some((selected: any) => selected.id === card.id);

    if (isAlreadySelected) {
      setIsSelected(false);
      controls.stop();
      onClick(card.id, null, null, null); // Speciális értékekkel jelezzük az eltávolítást
    } else if (isSelectable) {
      onClick(card.id, cardRef.current, controls, type);
      setIsSelected(true);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      onClick={handleCardClick}
      id={`card-${card.id}`}
      className={classNames(
        'cursor-pointer h-[16vh] w-[12vh] max-h-48 max-w-36  rounded-md bg-cover bg-center relative justify-center flex items-end pb-4',
      )}
      style={{ backgroundImage: `url(${card.image})`, boxShadow: '0px 2px 4px rgba(0,0,0,0.6)' }}
      whileHover={
        enableAnimation
          ? {
              rotate: [0, -1, 1, -1, 0],
              transition: { duration: 0.6, repeat: Infinity, repeatType: 'loop' },
            }
          : undefined
      }
    >
      {!onlyImg && (
        <>
          <div
            className="absolute top-2 left-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center"
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            {card.health}
          </div>

          <div
            className="absolute top-2 right-2 h-8 w-8 bg-blue-700 text-white rounded-full flex items-center justify-center"
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            {card.attack}
          </div>
        </>
      )}
    </motion.div>
  );
}
