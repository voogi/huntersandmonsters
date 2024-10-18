import { Card } from '@/app/models';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type CollectionItemProps = {
  card: Card;
};

export default function CollectionItem({ card }: CollectionItemProps) {
  const [isCentered, setIsCentered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      setCardDimensions({ width: rect.width, height: rect.height });
    }
    setIsCentered(!isCentered);
  };

  return (
    <>
      <div
        ref={itemRef}
        onClick={handleClick}
        className={classNames('h-48 bg-white w-36 rounded-md bg-cover bg-center relative')}
        style={{ backgroundImage: `url(${card.image})` }}
      >
        {card.name}
      </div>

      {isCentered && (
        <motion.div
          initial={{ x: position.x, y: position.y, scale: 1 }}
          animate={{
            x: `calc(50vw - ${cardDimensions.width / 2}px)`,  // Levonjuk a szélesség felét
            y: `calc(50vh - ${cardDimensions.height / 2}px)`, // Levonjuk a magasság felét
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
            transform: 'translate(-50%, -50%)', // Középre helyezzük az elem szélességével és magasságával
          }}
        >
          <div
            onClick={handleClick}
            className={classNames('h-48 bg-white w-36 rounded-md bg-cover bg-center')}
            style={{ backgroundImage: `url(${card.image})` }}
          />
        </motion.div>
      )}
    </>
  );
}
