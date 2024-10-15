import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';

const ANIMATION_DURATION_MS = 750;

export const DraggableCardItem = ({ id }: any) => {
  const sortable = useSortable({
    id,
    transition: { duration: ANIMATION_DURATION_MS, easing: 'ease' },
  });

  const { setNodeRef, attributes, transform, transition, listeners, isDragging } = sortable;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSmooth = useSpring(x || 0, { damping: 50, stiffness: 500 });
  const ySmooth = useSpring(y || 0, { damping: 50, stiffness: 500 });
  const xVelocity = useVelocity(xSmooth);
  const yVelocity = useVelocity(ySmooth);
  const rotateY = useTransform(xVelocity, [-1000, 0, 1000], [-20, 0, 20], {
    clamp: true,
  });
  const rotateX = useTransform(yVelocity, [-1000, 0, 1000], [20, 0, -20], {
    clamp: true,
  });

  useEffect(() => {
    x.set(transform?.x || 0);
    y.set(transform?.y || 0);
  }, [transform]);

  return (
    <div ref={setNodeRef}>
      <motion.div
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={classNames(isDragging && 'absolute', isDragging && 'z-50')}
        transition={{
          type: 'spring',
          duration: isDragging ? ANIMATION_DURATION_MS / 1000 : (ANIMATION_DURATION_MS / 1000) * 3,
        }}
        {...attributes}
        {...listeners}
      >
        <motion.div
          style={{
            boxShadow: '0px 2px 4px rgba(0,0,0,0.6)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            rotateX,
            rotateY,
          }}
          animate={{
            scale: isDragging ? 1.5 : 1,
          }}
          className={classNames('h-48 bg-white w-36 rounded-md bg-[url("/wolf.webp")] bg-cover bg-center')}
        ></motion.div>
      </motion.div>
    </div>
  );
};
