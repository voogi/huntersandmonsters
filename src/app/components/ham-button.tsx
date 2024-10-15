'use client';
import { extendVariants, Button, ButtonProps } from '@nextui-org/react';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useEffect } from 'react';

const ExtendedVariants = extendVariants(Button, {
  variants: {
    color: {
      primary: 'bg-[url("/button.png")] bg-cover bg-center bg-transparent text-white text-xl',
    },
  },
});

const animationVariants: Variants = {
  loading: {
    rotate: 360,
    transition: { duration: 3, repeat: Infinity, ease: 'linear'},
  },
  click: {
    rotate: 360,
    transition: { ease: 'circIn'},
    transitionEnd: { rotate: 0 }
  }
};


export const HamButton = ({ size, className, color, children, ref, isLoading, onClick }: ButtonProps) => {

  const controls = useAnimationControls();

  const click = (event: any) => {
    if(isLoading) return;
    onClick?.(event);
    controls.start('click');
  }

  useEffect(() => {
    if(isLoading) {
      controls.start('loading');
    }
  }, []);

  return (

    <div className={'relative'}>
      <motion.div

        variants={animationVariants}
        // animate={{ rotate: isLoading ? 360 : 0 } as any}
        animate={controls}>
        <ExtendedVariants
          disableRipple
          {...{
            ref,
            className,
            size,
            color,
            onClick: click,
            type: 'button',
          }}>

        </ExtendedVariants>
      </motion.div>
      <div className={'absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-semibold'}>
        {children}
      </div>
    </div>

  );
};