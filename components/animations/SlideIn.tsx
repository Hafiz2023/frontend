"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface SlideInProps extends HTMLMotionProps<"div"> {
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 30,
  ...props
}) => {
  const getInitialY = () => {
    if (direction === 'up') return distance;
    if (direction === 'down') return -distance;
    return 0;
  };

  const getInitialX = () => {
    if (direction === 'left') return distance;
    if (direction === 'right') return -distance;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: getInitialX(), y: getInitialY() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.8, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
