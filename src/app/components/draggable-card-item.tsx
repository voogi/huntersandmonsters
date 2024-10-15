import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { CSS } from '@dnd-kit/utilities';

const ANIMATION_DURATION_MS = 750;

export const DraggableCardItem = ({ id, overlay, rotate, item }: any) => {
  const sortable = useSortable({
    id,
    transition: { duration: ANIMATION_DURATION_MS, easing: 'ease' },
  });

  const { setNodeRef, attributes, transform, transition, listeners, isDragging } = sortable;

  return (
    <div ref={setNodeRef}>
      <motion.div
        style={{
          transform: CSS.Translate.toString(transform),
          transition,
        }}
        className={classNames(isDragging && 'absolute', isDragging && 'z-50', isDragging && !overlay && 'opacity-0')}
        transition={{
          type: 'spring',
          duration: isDragging ? ANIMATION_DURATION_MS / 1000 : (ANIMATION_DURATION_MS / 1000) * 3,
        }}
        {...attributes}
        {...listeners}
      >
        {item?.id}
        <motion.div
          style={{
            boxShadow: '0px 2px 4px rgba(0,0,0,0.6)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            rotateX: rotate?.x || 0,
            rotateY: rotate?.y || 0,
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
