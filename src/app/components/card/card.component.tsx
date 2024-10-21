import { motion } from 'framer-motion';
import classNames from 'classnames';
import React from 'react';

export function CardComponent({ card }: { card: any }) {
  return (
    <motion.div
      className={classNames(
        'cursor-pointer h-56 w-44 rounded-md bg-cover bg-center relative justify-center flex items-end pb-4',
      )}
      style={{ backgroundImage: `url(${card.image})` }}
      whileHover={{ rotate: [0, -1, 1, -1, 0], transition: { duration: 0.6, repeat: Infinity, repeatType: 'loop' } }}
    >
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
    </motion.div>
  );
}
