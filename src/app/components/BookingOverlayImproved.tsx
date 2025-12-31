import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cal from '@calcom/embed-react';
import logo from '../assets/home/logo.png';
import myPic from '../assets/home/badge_pic_1.jpg';

interface BookingOverlayImprovedProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const EVENT_TYPES = {
  '15min': { label: '15 min', public: true },
  '30min': { label: '30 min', public: true },
  secret: { label: 'Secret', public: false },
} as const;

type EventType = keyof typeof EVENT_TYPES;

export function BookingOverlayImproved({ isOpen, onClose, isDark }: BookingOverlayImprovedProps) {
  const getInitialEventType = (): EventType => {
    const params = new URLSearchParams(window.location.search);
    const meeting = params.get('meeting') as EventType;
    if (meeting && EVENT_TYPES[meeting]) return meeting;
    return '15min';
  };

  const [eventType, setEventType] = useState<EventType>(getInitialEventType);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('meeting', eventType);
    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [eventType]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[300]"
            style={{
              backdropFilter: 'blur(20px)',
              background: isDark ? 'rgba(10,14,39,0.95)' : 'rgba(224,242,254,0.95)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <div className="fixed inset-0 z-[301] flex items-stretch justify-center p-0 md:p-6">
            <motion.div
              className="w-full backdrop-blur-xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              style={{
                background: isDark ? 'rgba(10,14,39,0.95)' : 'rgba(255,255,255,0.95)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(3,105,161,0.2)'}`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Panel - Hidden on mobile */}
              <div className="hidden md:flex w-[350px] p-6 flex-col items-center border-r"
                   style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(3,105,161,0.2)' }}>
                <img src={logo} className="w-20 h-20 mb-4" alt="Logo" />
                <img src={myPic} className="w-24 h-24 rounded-full mb-4" alt="My Pic" />
                <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kahoul Abd El Madjid
                </h3>
                <p className={`text-md ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Schedule your meeting
                </p>
                
                {/* Event type selector - Desktop only */}
                <div className="flex gap-2 mt-6 flex-col w-full">
                  {(Object.entries(EVENT_TYPES) as [EventType, any][])
                    .filter(([key, cfg]) => cfg.public || key === eventType)
                    .map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setEventType(key)}
                        className={`px-4 py-2 rounded-lg text-sm transition ${
                          eventType === key
                            ? isDark
                              ? 'bg-white/10 text-white'
                              : 'bg-slate-900/10 text-slate-900'
                            : isDark
                            ? 'text-gray-400 hover:bg-white/5'
                            : 'text-slate-500 hover:bg-slate-900/5'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                </div>
              </div>

              {/* Right Panel - Cal.com Embed */}
              <div className="relative flex-1 p-4 md:p-6 overflow-y-auto">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg z-10"
                  style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                </motion.button>

                {/* Event type selector - Mobile only */}
                <div className="flex md:hidden gap-2 mb-4 flex-wrap">
                  {(Object.entries(EVENT_TYPES) as [EventType, any][])
                    .filter(([key, cfg]) => cfg.public || key === eventType)
                    .map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setEventType(key)}
                        className={`px-4 py-2 rounded-lg text-sm transition ${
                          eventType === key
                            ? isDark
                              ? 'bg-white/10 text-white'
                              : 'bg-slate-900/10 text-slate-900'
                            : isDark
                            ? 'text-gray-400 hover:bg-white/5'
                            : 'text-slate-500 hover:bg-slate-900/5'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                </div>

                {/* Embed Cal.com */}
                <motion.div
                  key={eventType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-[600px] w-full"
                >
                  <Cal
                    calLink={`kahoul-abd-el-madjid-77uv3l/${eventType}`}
                    style={{ width: '100%', height: '100%' }}
                    config={{ theme: isDark ? 'dark' : 'light' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}