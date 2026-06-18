"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -15 }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
        style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
