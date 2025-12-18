'use client';

import { motion } from 'framer-motion';
import { Card, CardProps } from '@mui/material';

type MotionCardProps = CardProps & {
  hover?: boolean;
};

export default function MotionCard({
  children,
  hover = true,
  ...props
}: MotionCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -2,
            }
          : undefined
      }
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 18,
      }}
      style={{ height: '100%' }}
    >
      <Card {...props}>{children}</Card>
    </motion.div>
  );
}
