import { Card } from '@/app/models';
import classNames from 'classnames';
import { useState } from 'react';
import { motion } from 'framer-motion';

type CollectionItemProps = {
  card: Card;
};
export default function CollectionItem({ card }: CollectionItemProps) {
  const [isCentered, setIsCentered] = useState(false);
  return (
    <>
      {!isCentered && (
        <div
          onClick={() => setIsCentered(!isCentered)}
          className={classNames('h-48 bg-white w-36 rounded-md bg-cover bg-center')}
          style={{ backgroundImage: `url(${card.image})` }}
        >{card.name}</div>
      )}
      {isCentered && (
        <motion.div
          animate={{ scale: 1, x: isCentered ? '50vw' : 0, y: isCentered ? '50vw' : 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          style={{
            width: 200,
            height: 200,
            display: 'flex',
            borderRadius: 10,
            position: isCentered ? 'absolute' : 'relative',
          }}
        >
          <div
            onClick={() => setIsCentered(!isCentered)}
            className={classNames('h-48 bg-white w-36 rounded-md bg-cover bg-center')}
            style={{ backgroundImage: `url(${card.image})` }}
          />
        </motion.div>
      )}
    </>
  );
}
