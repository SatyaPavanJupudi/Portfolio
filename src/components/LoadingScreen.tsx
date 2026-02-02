import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  const [fillLevel, setFillLevel] = useState(0);

  // Animate the fill level from 0 to 100
  useEffect(() => {
    const interval = setInterval(() => {
      setFillLevel((prev) => {
        if (prev >= 100) return 0; // Reset and loop
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background dark:bg-background z-50 overflow-hidden">
      {/* Animated background gradient matching theme */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background gradient blobs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-3xl"
          initial={{ x: -200, y: -200 }}
          animate={{ x: -100, y: -100 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "-10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl"
          initial={{ x: 200, y: 200 }}
          animate={{ x: 100, y: 100 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          style={{ bottom: "-10%", right: "-10%" }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Liquid Fill Circle Loader */}
        <motion.div
          className="relative w-48 h-48 mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* SVG with wave filter for liquid effect */}
          <svg
            className="absolute inset-0 w-full h-full filter drop-shadow-lg"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Wave filter for organic liquid edges */}
              <filter id="wave">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                  seed="2"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="8"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* Gradient for liquid */}
              <defs>
                <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Clipping path for circle */}
              <clipPath id="circleClip">
                <circle cx="100" cy="100" r="95" />
              </clipPath>
            </defs>

            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Liquid container */}
            <g clipPath="url(#circleClip)">
              {/* Animated liquid level */}
              <motion.g
                animate={{
                  y: 200 - (fillLevel / 100) * 200,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Wave-like liquid with filter */}
                <path
                  d="M 0 200 
                     Q 50 180, 100 190 
                     T 200 200 
                     L 200 0 
                     L 0 0 Z"
                  fill="url(#liquidGradient)"
                  filter="url(#wave)"
                  opacity="0.95"
                />

                {/* Additional wave layer for depth */}
                <motion.path
                  d="M 0 200 
                     Q 50 190, 100 185 
                     T 200 200 
                     L 200 0 
                     L 0 0 Z"
                  fill="hsl(var(--primary))"
                  opacity="0.3"
                  animate={{
                    d: [
                      "M 0 200 Q 50 190, 100 185 T 200 200 L 200 0 L 0 0 Z",
                      "M 0 200 Q 50 195, 100 188 T 200 200 L 200 0 L 0 0 Z",
                      "M 0 200 Q 50 185, 100 192 T 200 200 L 200 0 L 0 0 Z",
                      "M 0 200 Q 50 190, 100 185 T 200 200 L 200 0 L 0 0 Z",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.g>
            </g>

            {/* Circle outline on top */}
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>

          {/* Center content - visible when liquid reaches certain level */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: fillLevel > 30 ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center"
              animate={{
                scale: fillLevel > 50 ? 1 : 0.8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="text-4xl font-bold text-white drop-shadow-lg"
                animate={{
                  opacity: fillLevel > 50 ? 1 : 0.5,
                }}
              >
                {Math.round(fillLevel)}%
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading text with animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-lg md:text-xl font-semibold text-gradient">
              Satya Pavan Portfolio
            </span>
            <span className="text-foreground/70 text-lg md:text-xl">Loading</span>
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="text-primary font-bold text-lg md:text-xl"
                animate={{ opacity: [0.4, 1, 0.4] }}
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

        {/* Progress indicator below */}
        <motion.div
          className="mt-10 w-48 h-1 bg-border dark:bg-border rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            style={{ width: `${fillLevel}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
