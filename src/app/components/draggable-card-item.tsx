import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { CSS } from '@dnd-kit/utilities';
import { useEffect } from 'react';
import { useDndContext } from '@dnd-kit/core';
import { CardComponent } from '@/app/components/card/card.component';
import { Card } from '@prisma/client';
import { PlayerType } from '@/app/models';

const ANIMATION_DURATION_MS = 750;

export const DraggableCardItem = ({
  card,
  disable,
  enableSelection = true,
  onClick,
  type,
  selectedCards,
}: {
  card: Card;
  disable?: boolean;
  enableSelection: boolean;
  onClick?: any;
  type: PlayerType;
  selectedCards: any;
}) => {
  function customAnimate(args: any) {
    const { isSorting, wasDragging } = args;
    if (isSorting || wasDragging) {
      return defaultAnimateLayoutChanges(args);
    }
    return true;
  }

  const sortable = useSortable({
    id: card?.id,
    animateLayoutChanges: customAnimate,
    transition: { duration: ANIMATION_DURATION_MS, easing: 'ease' },
    disabled: disable,
  });

  const { setNodeRef, attributes, transform, transition, listeners, isDragging } = sortable;

  return (
    <div ref={setNodeRef} className={'h-full'}>
      <motion.div
        style={{
          transform: CSS.Translate.toString(transform),
          transition,
        }}
        className={classNames(isDragging && 'opacity-0', 'h-full')}
        transition={{
          type: 'spring',
          duration: isDragging ? ANIMATION_DURATION_MS / 1000 : (ANIMATION_DURATION_MS / 1000) * 3,
        }}
        {...attributes}
        {...listeners}
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className={classNames('h-full rounded-md bg-cover bg-center')}
        >
          {card && (
            <CardComponent
              selectedCards={selectedCards}
              type={type}
              onClick={onClick}
              enableAnimation={!disable}
              enableSelection={enableSelection}
              card={card}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const DraggableOverlayCardItem = ({ id, dragDelta, image }: any) => {
  const context = useDndContext();
  const isActive = context.active?.id === id;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSmooth = useSpring(x || 0, { damping: 40, stiffness: 500 });
  const ySmooth = useSpring(y || 0, { damping: 40, stiffness: 500 });
  const xVelocity = useVelocity(xSmooth);
  const yVelocity = useVelocity(ySmooth);
  const rotateY = useTransform(xVelocity, [-1000, 0, 1000], [-20, 0, 20], {
    clamp: true,
  });
  const rotateX = useTransform(yVelocity, [-1000, 0, 1000], [20, 0, -20], {
    clamp: true,
  });

  useEffect(() => {
    x.set(dragDelta?.x || 0);
    y.set(dragDelta?.y || 0);
  }, [dragDelta]);

  return (
    <div>
      <motion.div>
        <motion.div
          style={{
            boxShadow: '0px 2px 4px rgba(0,0,0,0.6)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            rotateX,
            rotateY,
            backgroundImage: `url(${image})`,
          }}
          animate={{
            scale: isActive ? 1.5 : 1,
          }}
          className={classNames('h-48 bg-white w-36 rounded-md bg-[url("/wolf.webp")] bg-cover bg-center')}
        ></motion.div>
      </motion.div>
    </div>
  );
};
