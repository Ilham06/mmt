'use client';

import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@mui/material';

type MotionButtonProps = ButtonProps & {
  disabled?: boolean;
};

export default function MotionButton({
  children,
  disabled,
  ...props
}: MotionButtonProps) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.04 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 22,
      }}
      style={{
        display: 'inline-block',
        width: 'fit-content',
      }}
    >
      <Button disabled={disabled} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
