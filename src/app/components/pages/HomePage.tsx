import { motion } from 'motion/react';
import { ArrowRight, Calendar, Download } from 'lucide-react';
import { IdentityBadge } from '../IdentityBadge';
import React from 'react';
import CV from '../../assets/home/General_CV_anglais___Software___Intelligent_Systems_Engineer__A.pdf';
import { content } from '@/data/index';

// Memoized character component for better performance
const AnimatedChar = React.memo(({ 
  char, 
  lineIndex, 
  charIndex, 
  isDark 
}: { 
  char: string; 
  lineIndex: number; 
  charIndex: number; 
  isDark: boolean;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Pre-calculate star positions once per character
  const splitPositions = React.useMemo(() => {
    const starCount = 6; // Reduced from 8-16 for better performance
    const positions = [];
    for (let i = 0; i < starCount; i++) {
      const angle = (Math.PI * 2 * i) / starCount + (Math.random() - 0.5) * 0.3;
      const distance = 30 + Math.random() * 10;
      positions.push({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360 - 180,
        delay: i * 0.03,
      });
    }
    return positions;
  }, []);

  if (char === ' ') {
    return <span className="inline-block w-2" />;
  }

  return (
    <motion.span
      className="relative inline-block"
      style={{ 
        willChange: isHovered ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span
        className="inline-block"
        style={{ transform: 'translateZ(0)' }}
        animate={isHovered ? { opacity: 0, scale: 0.3 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {char}
      </motion.span>
      
      {isHovered && splitPositions.map((pos, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none left-1/2 top-1/2"
          style={{ 
            transform: 'translate(-50%, -50%) translateZ(0)',
            willChange: 'transform, opacity'
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: pos.x,
            y: pos.y,
            opacity: [0, 1, 0.8],
            scale: [0, 0.7, 0.5],
            rotate: pos.rotation,
          }}
          transition={{
            duration: 0.5,
            delay: pos.delay,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className={isDark ? 'drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_4px_rgba(3,105,161,0.6)]'}
          >
            <path
              d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
              fill={isDark ? '#ffffff' : '#0369a1'}
              opacity="0.9"
            />
          </svg>
        </motion.span>
      ))}
    </motion.span>
  );
});

AnimatedChar.displayName = 'AnimatedChar';

// Animated name component
const AnimatedName = React.memo(({ 
  firstName, 
  lastName, 
  isDark 
}: { 
  firstName: string; 
  lastName: string; 
  isDark: boolean;
}) => {
  return (
    <motion.h1
      className={`text-5xl md:text-6xl ${
        isDark ? 'text-white' : 'text-slate-900'
      } tracking-tight font-bold cursor-default`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {[firstName, lastName].map((namePart, lineIndex) => (
        <div key={lineIndex} className={lineIndex === 1 ? 'mt-2' : ''}>
          {namePart.split('').map((char, charIndex) => (
            <AnimatedChar
              key={`${lineIndex}-${charIndex}`}
              char={char}
              lineIndex={lineIndex}
              charIndex={charIndex}
              isDark={isDark}
            />
          ))}
        </div>
      ))}
    </motion.h1>
  );
});

AnimatedName.displayName = 'AnimatedName';

interface HomePageProps {
  isDark: boolean;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export function HomePage({ isDark, onNavigate, onOpenBooking }: HomePageProps) {
  const { firstName, lastName, title, tagline } = content.personal;
  const { viewProjects, bookMeeting, downloadCV } = content.home.buttons;
  
  const handleBookingClick = () => {
    console.log('HomePage - Book a Meeting button clicked');
    onOpenBooking();
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center px-7 pt-32 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 px-8 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="space-y-6"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              perspective: 1000,
            }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div style={{ transform: 'translateZ(0)' }}>
              <AnimatedName firstName={firstName} lastName={lastName} isDark={isDark} />
            </div>

            <motion.div
              className={`text-xl md:text-2xl ${
                isDark ? 'text-cyan-300' : 'text-cyan-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.div>
          </motion.div>

          <motion.p
            className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-slate-700'
            } max-w-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={() => onNavigate('projects')}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl backdrop-blur-xl shadow-lg"
              style={{
                background: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(6, 182, 212, 0.2)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(6, 182, 212, 0.3)'
                }`,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                {viewProjects}
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
              </motion.div>
            </motion.button>

            <motion.button
              onClick={handleBookingClick}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl backdrop-blur-xl shadow-lg"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(147, 51, 234, 0.3))'
                  : 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(147, 51, 234, 0.4))',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(6, 182, 212, 0.3)'
                }`,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                {bookMeeting}
              </span>
            </motion.button>

            <motion.a
              href={CV}
              download
              target="_blank"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl backdrop-blur-xl shadow-lg"
              style={{
                background: isDark
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(6, 182, 212, 0.3)'
                }`,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                {downloadCV}
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Content - Identity Badge */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <IdentityBadge isDark={isDark} />
        </motion.div>
      </div>
    </section>
  );
}
