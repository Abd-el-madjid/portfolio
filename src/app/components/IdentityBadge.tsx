import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { totalBadgeImages, loadImage, preloadNextImage } from '../utils/badgeImages';
import { content } from '@/data/index';

interface IdentityBadgeProps {
  isDark: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

const INTERVAL = 10_000; // 10 seconds
const STORAGE_KEY = 'badge-rotation-state';

export function IdentityBadge({ isDark }: IdentityBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const [index, setIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  // Mouse movement handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;

    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Restore state from sessionStorage
  function restoreState() {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { index: 0, remaining: INTERVAL };

    const saved = JSON.parse(raw) as { index: number; lastChange: number };
    const elapsed = Date.now() - saved.lastChange;
    const steps = Math.floor(elapsed / INTERVAL);
    const restoredIndex = (saved.index + steps) % totalBadgeImages;
    const remaining = INTERVAL - (elapsed % INTERVAL);

    return { index: restoredIndex, remaining };
  }

  const advance = () => {
    setIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalBadgeImages;
      
      loadImage(nextIndex).then((src) => {
        if (src) {
          setCurrentSrc(src);
          preloadNextImage(nextIndex);
          sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ index: nextIndex, lastChange: Date.now() })
          );
        }
      });

      timerRef.current = setTimeout(advance, INTERVAL);
      return nextIndex;
    });
  };

  // On mount
  useEffect(() => {
    const { index: restoredIndex, remaining } = restoreState();

    loadImage(restoredIndex).then((src) => setCurrentSrc(src));
    setIndex(restoredIndex);

    timerRef.current = setTimeout(advance, remaining);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={badgeRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Shooting stars effect for dark mode */}
      {isDark && isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                opacity: 0,
              }}
              animate={{
                x: [Math.random() * 300 - 150, Math.random() * 400 + 200],
                y: [Math.random() * 300 - 150, Math.random() * 400 + 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </>
      )}

      {/* Cloud effect for light mode */}
      {!isDark && isHovered && (
        <>
          <motion.div
            className="absolute -inset-20 bg-white/40 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </>
      )}

      {/* Badge Container */}
      <motion.div
        className="relative w-72 h-96 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: 'preserve-3d',
          background: isDark
            ? 'rgba(10, 14, 39, 0.6)'
            : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${
            isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
          }`,
        }}
        animate={{
          y: isHovered ? -10 : 0,
          boxShadow: isHovered
            ? isDark
              ? '0 30px 60px rgba(255, 255, 255, 0.2)'
              : '0 30px 60px rgba(3, 105, 161, 0.3)'
            : isDark
            ? '0 20px 40px rgba(0, 0, 0, 0.3)'
            : '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2), transparent 70%)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Image */}
        <div className="relative w-full h-full p-6">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            {currentSrc && (
              <ImageWithFallback
                key={currentSrc}
                src={currentSrc}
                alt={content.identityBadge.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Name overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md"
          style={{
            background: isDark
              ? 'linear-gradient(to top, rgba(10, 14, 39, 0.9), transparent)'
              : 'linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent)',
          }}
          initial={{ y: 100 }}
          animate={{ y: isHovered ? 0 : 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <h3 className={`text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.identityBadge.name}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            {content.identityBadge.role}
          </p>
        </motion.div>
      </motion.div>

      {/* Idle floating animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}