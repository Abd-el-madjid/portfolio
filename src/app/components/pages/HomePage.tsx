import { motion } from 'motion/react';
import { ArrowRight, Calendar, Download } from 'lucide-react';
import { IdentityBadge } from '../IdentityBadge';
import React from 'react';
import CV from '../../assets/home/General_CV_anglais___Software___Intelligent_Systems_Engineer__A.pdf';
import { content } from '@/data/index';

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
              {[firstName, lastName].map((namePart, lineIndex) => (
                <div key={lineIndex} className={lineIndex === 1 ? 'mt-2' : ''}>
                  {namePart.split('').map((char, index) => {
                const [isHovered, setIsHovered] = React.useState(false);
                const [isClicked, setIsClicked] = React.useState(false);

                const starCount = React.useMemo(() => Math.floor(Math.random() * 8) + 8, []);
                
                const splitPositions = React.useMemo(() => {
                  const positions = [];
                  for (let i = 0; i < starCount; i++) {
                    const angle = (Math.PI * 2 * i) / starCount + (Math.random() - 0.5) * 0.5;
                    const distance = 25 + Math.random() * 15;
                    positions.push({
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      rotation: Math.random() * 720 - 360,
                      delay: Math.random() * 0.1,
                    });
                  }
                  return positions;
                }, [starCount]);
                
                return (
                  <motion.span
                    key={`${lineIndex}-${index}`}
                    className="relative"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={() => {
                      setIsClicked(true);
                      setTimeout(() => setIsClicked(false), 600);
                    }}
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                    }}
                  >
                    <motion.span
                      style={{
                        display: 'inline-block',
                      }}
                      animate={isHovered ? {
                        opacity: 0,
                        scale: 0.3,
                      } : {
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {char}
                    </motion.span>
                    
                    {char !== ' ' && splitPositions.map((pos, i) => (
                      <motion.span
                        key={i}
                        className="absolute pointer-events-none"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={isHovered ? {
                          x: pos.x,
                          y: pos.y,
                          opacity: [0, 1, 0.9, 0.7],
                          scale: [0, 0.8, 0.6, 0.5],
                          rotate: pos.rotation,
                        } : {
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0,
                          rotate: 0,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: pos.delay,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          style={{
                            filter: isDark 
                              ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))'
                              : 'drop-shadow(0 0 4px rgba(3, 105, 161, 0.6))'
                          }}
                        >
                          <path
                            d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
                            fill={isDark ? '#ffffff' : '#0369a1'}
                            opacity="0.9"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="8"
                            fill={isDark ? '#ffffff' : '#0369a1'}
                            opacity="0.15"
                          />
                        </svg>
                      </motion.span>
                    ))}
                  </motion.span>
                );
              })}
                </div>
              ))}
            </motion.h1>

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