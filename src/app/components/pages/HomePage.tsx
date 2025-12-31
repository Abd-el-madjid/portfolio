import { motion } from 'motion/react';
import { ArrowRight, Calendar, Download } from 'lucide-react';
import { IdentityBadge } from '../IdentityBadge';
import React from 'react';

interface HomePageProps {
  isDark: boolean;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export function HomePage({ isDark, onNavigate, onOpenBooking }: HomePageProps) {
  const name = "Kahoul Abd El Madjid";
  
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-32 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 px-8 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="space-y-4"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.h1
              className={`text-5xl md:text-6xl ${
                isDark ? 'text-white' : 'text-slate-900'
              } tracking-tight font-bold cursor-default`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {name.split('').map((char, index) => {
                const [isHovered, setIsHovered] = React.useState(false);
                
                return (
                  <motion.span
                    key={index}
                    className="inline-block relative"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    animate={isHovered ? {
                      y: -10,
                      scale: 1.3,
                    } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 10
                    }}
                    style={{
                      display: char === ' ' ? 'inline' : 'inline-block',
                      marginRight: char === ' ' ? '0.5rem' : '0',
                    }}
                  >
                    <motion.span
                      animate={isHovered ? {
                        opacity: [1, 0],
                        scale: [1, 0],
                      } : {
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                    
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center"
                      animate={isHovered ? {
                        opacity: [0, 1],
                        scale: [0, 1.2],
                      } : {
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontSize: '1em',
                      }}
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        style={{
                          filter: isDark 
                            ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.4))'
                            : 'drop-shadow(0 0 8px rgba(3, 105, 161, 0.6))'
                        }}
                      >
                        {/* Main star shape */}
                        <path
                          d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
                          fill={isDark ? '#ffffff' : '#0369a1'}
                          opacity="0.9"
                        />
                        {/* Glow circle */}
                        <circle
                          cx="12"
                          cy="10"
                          r="8"
                          fill={isDark ? '#ffffff' : '#0369a1'}
                          opacity="0.15"
                        />
                      </svg>
                    </motion.span>
                  </motion.span>
                );
              })}
            </motion.h1>

            <motion.div
              className={`text-xl md:text-2xl ${
                isDark ? 'text-cyan-300' : 'text-cyan-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer & AI Specialist
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
            Building systems that don't just work, but think. Combining architectural rigor 
            with intelligent automation, I focus on solutions that scale, adapt, and evolve.
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
                View Projects
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
              </motion.div>
            </motion.button>

            <motion.button
              onClick={onOpenBooking}
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
                Book a Meeting
              </span>
            </motion.button>

            <motion.a
              href="/cv.pdf"
              download
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
                Download CV
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