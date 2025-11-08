import React from "react";
import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background dark:bg-background z-50">
      {/* Animated background gradient matching theme */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gradient orbs matching portfolio theme */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
          initial={{ x: -200, y: -200 }}
          animate={{ x: -100, y: -100 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "-10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl"
          initial={{ x: 200, y: 200 }}
          animate={{ x: 100, y: 100 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          style={{ bottom: "-10%", right: "-10%" }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated circle with gradient border */}
        <motion.div
          className="relative w-32 h-32 mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Outer rotating gradient circle using theme colors */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-300 to-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner circle with theme background */}
          <div className="absolute inset-1 rounded-full bg-background dark:bg-slate-900 flex items-center justify-center shadow-glow">
            {/* Center pulsing dot */}
            <motion.div
              className="w-3 h-3 bg-gradient-to-br from-primary to-blue-300 rounded-full shadow-lg"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Orbiting particles */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 + index * 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  top: "0%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.6 - index * 0.15,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text with animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
            Satya Pavan
          </h1>
          <p className="text-lg md:text-xl font-semibold text-foreground/70">Portfolio</p>

          {/* Animated loading text */}
          <motion.div className="flex items-center justify-center gap-1 mt-4">
            <span className="text-foreground/60 text-sm md:text-base">Loading</span>
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="text-primary font-bold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                .
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Subtle progress indicator */}
        <motion.div
          className="mt-8 w-48 h-1 bg-border rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-gradient-primary"
            animate={{ x: [-192, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
