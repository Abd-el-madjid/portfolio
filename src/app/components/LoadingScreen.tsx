// File Location: src/components/LoadingScreen.tsx

import { motion } from 'motion/react';
import Logo from '../assets/home/logo.webp';

interface LoadingScreenProps {
  isDark: boolean;
  progress: number;
}

export function LoadingScreen({ isDark, progress }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0e27 0%, #1a0b2e 50%, #050510 100%)'
          : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const delay = Math.random() * 2;
          const duration = Math.random() * 3 + 2;
          const x = Math.random() * 100;
          const y = Math.random() * 100;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                background: isDark
                  ? `rgba(${i % 2 === 0 ? '6, 182, 212' : '139, 92, 246'}, 0.6)`
                  : `rgba(${i % 2 === 0 ? '3, 105, 161' : '124, 58, 237'}, 0.4)`,
                boxShadow: isDark
                  ? `0 0 ${size * 4}px rgba(6, 182, 212, 0.5)`
                  : `0 0 ${size * 4}px rgba(3, 105, 161, 0.3)`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with Pulsing Glow */}
        <motion.div
          className="relative mb-8"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.4))'
                : 'radial-gradient(circle, rgba(3, 105, 161, 0.3), rgba(124, 58, 237, 0.3))',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Logo */}
          <motion.img
            src={Logo}
            alt="Logo"
            className="relative w-32 h-28 object-contain"
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

      

      <div className="absolute top-[50px] left-0 right-0 flex items-center justify-center">

        {/* Orbiting Particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (360 / 8) * i;
          const radius = 120;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: isDark
                  ? `rgba(${i % 2 === 0 ? '6, 182, 212' : '139, 92, 246'}, 0.8)`
                  : `rgba(${i % 2 === 0 ? '3, 105, 161' : '124, 58, 237'}, 0.6)`,
                boxShadow: isDark
                  ? '0 0 10px rgba(6, 182, 212, 0.6)'
                  : '0 0 10px rgba(3, 105, 161, 0.4)',
              }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * radius,
                  Math.cos(((angle + 360) * Math.PI) / 180) * radius,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * radius,
                  Math.sin(((angle + 360) * Math.PI) / 180) * radius,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              />
             
          );
        })}
      </div>
 </div>
      {/* Bottom Text */}
      <motion.div
        className={`absolute bottom-12 text-sm ${
          isDark ? 'text-gray-400' : 'text-slate-600'
        }`}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        Preparing your experience...
      </motion.div>
    </motion.div>
  );
}
