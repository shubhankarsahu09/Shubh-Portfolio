import React, { type ElementType } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type FadeInProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<any>, 'as'>;

export const FadeIn = <T extends ElementType = 'div'>({
  as,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  children,
  className,
  ...props
}: FadeInProps<T>) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};
