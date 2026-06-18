"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialScale?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  initialScale = 0.9,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.8, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
