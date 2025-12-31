import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu,Download, Github, Linkedin, Calendar } from 'lucide-react';
import Logo from '../assets/home/logo.png';
import CV from '../assets/home/General_CV_anglais___Software___Intelligent_Systems_Engineer__A.pdf';

interface HeaderWithPagesProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
  onOpenMobileMenu: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function HeaderWithPages({ 
  isDark, 
  onToggleTheme, 
  onOpenBooking, 
  onOpenMobileMenu,
  currentPage,
  onNavigate
}: HeaderWithPagesProps) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
  ];

  const isHome = currentPage === 'home';

  return (
    <motion.header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="backdrop-blur-xl rounded-2xl shadow-2xl border px-6 py-4"
        style={{
          background: isDark
            ? 'rgba(10, 14, 39, 0.6)'
            : 'rgba(255, 255, 255, 0.4)',
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(3, 105, 161, 0.2)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span
                  className={`${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  } hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}
                >
                  {link.label}
                </span>
                {currentPage === link.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.8)'
                        : 'rgba(3, 105, 161, 0.8)',
                    }}
                    layoutId="activePage"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/Abd-el-madjid"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:block ${isDark ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kahoul-abd-el-madjid"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:block ${isDark ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Linkedin size={20} />
            </motion.a>

            {/* Download CV - Hidden on Home page */}
            {!isHome && (
              <motion.a
                href={CV}
                download
                target="_blank"

                className={`hidden md:block ${isDark ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Download size={20} />
              </motion.a>
            )}

            {/* Book Button - Hidden on Home page */}
            {!isHome && (
              <motion.button
                onClick={onOpenBooking}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-slate-900'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar size={16} />
                <span>Book</span>
              </motion.button>
            )}

            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg ${
                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-900/10 hover:bg-slate-900/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={onOpenMobileMenu}
              className={`md:hidden p-2 rounded-lg ${
                isDark ? 'bg-white/10' : 'bg-slate-900/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}