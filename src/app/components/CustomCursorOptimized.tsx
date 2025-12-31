import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface CustomCursorProps {
  isDark?: boolean;
}

export function CustomCursorOptimized({ isDark = true }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule next frame
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: mouseX, y: mouseY });
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: isClicking ? 0.8 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {isDark ? (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="12" cy="10" r="8" fill="white" opacity="0.1" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" fill="#0369a1" opacity="0.8" />
          <circle cx="12" cy="12" r="4" fill="#fbbf24" opacity="0.9" />
          <circle cx="12" cy="12" r="10" fill="#fbbf24" opacity="0.1" />
        </svg>
      )}
    </motion.div>
  );
}
