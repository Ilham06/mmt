"use client";

import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function XPGainToast({
  xp,
  visible,
}: {
  xp: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              px: 2.5,
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
            }}
          >
            <Typography fontWeight={800}>
              🎉 +{xp} XP
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
