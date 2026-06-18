"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.8, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
