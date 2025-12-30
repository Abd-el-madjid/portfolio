import { motion } from 'motion/react';
import { ArrowRight, Calendar, Download } from 'lucide-react';
import { IdentityBadge } from '../IdentityBadge';

interface HomePageProps {
  isDark: boolean;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export function HomePage({ isDark, onNavigate, onOpenBooking }: HomePageProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
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
              className={`text-6xl md:text-7xl ${
                isDark ? 'text-white' : 'text-slate-900'
              } tracking-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Name
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
