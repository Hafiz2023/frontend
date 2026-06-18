"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface HoverAnimProps extends HTMLMotionProps<"div"> {
  scaleUp?: number;
  liftY?: number;
}

export const HoverAnim: React.FC<HoverAnimProps> = ({
  children,
  scaleUp = 1.02,
  liftY = -4,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: scaleUp, y: liftY }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
