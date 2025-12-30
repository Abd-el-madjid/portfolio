import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Linkedin, Calendar } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

export function MobileMenu({ isOpen, onClose, isDark, onOpenBooking, onNavigate }: MobileMenuProps) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
  ];

  const handleNavigate = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const handleBooking = () => {
    onOpenBooking();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{
              backdropFilter: 'blur(20px)',
              background: isDark
                ? 'rgba(10, 14, 39, 0.8)'
                : 'rgba(224, 242, 254, 0.8)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-8 right-8 p-3 rounded-full"
              style={{
                background: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(15, 23, 42, 0.1)',
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} className={isDark ? 'text-white' : 'text-slate-900'} />
            </motion.button>

            {/* Menu Items */}
            <nav className="flex flex-col items-center gap-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-3xl ${
                    isDark ? 'text-white hover:text-cyan-300' : 'text-slate-900 hover:text-cyan-600'
                  } transition-colors`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Social Links */}
              <motion.div
                className="flex gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
              >
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isDark ? 'text-white' : 'text-slate-900'}
                  whileHover={{ scale: 1.2, y: -5 }}
                >
                  <Github size={28} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isDark ? 'text-white' : 'text-slate-900'}
                  whileHover={{ scale: 1.2, y: -5 }}
                >
                  <Linkedin size={28} />
                </motion.a>
              </motion.div>

              {/* Book Meeting Button */}
              <motion.button
                onClick={handleBooking}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl mt-4"
                style={{
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(6, 182, 212, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (menuItems.length + 1) * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  Book a Meeting
                </span>
              </motion.button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}