import React from 'react';
import clsx from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Card.module.css';

import { FadeIn } from '../animations/FadeIn';

export interface CardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean;
  animateIn?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ className, hoverable = false, animateIn = false, delay = 0, children, ...props }) => {
  const cardContent = (
    <motion.div
      className={clsx(styles.card, hoverable && styles.hoverable, className)}
      {...props}
    >
      {children}
    </motion.div>
  );

  if (animateIn) {
    return <FadeIn delay={delay}>{cardContent}</FadeIn>;
  }
  
  return cardContent;
};
