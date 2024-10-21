"use client";
import {motion} from 'framer-motion';

export const AnimatedHead1 = () => {
  return (
    <div className="text-center text-4xl font-bold">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Chatter PDF
      </motion.h1>
    </div>
  )
}
