import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Globe, Video } from 'lucide-react';
import { useState } from 'react';

interface BookingOverlayImprovedProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function BookingOverlayImproved({ isOpen, onClose, isDark }: BookingOverlayImprovedProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [view, setView] = useState<'12h' | '24h'>('12h');

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    // Add previous month's days
    const prevMonthDays = [];
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      prevMonthDays.push({ date, isCurrentMonth: false });
    }

    // Add current month's days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      currentMonthDays.push({ date, isCurrentMonth: true, isPast: date < today });
    }

    return [...prevMonthDays, ...currentMonthDays];
  };

  const days = generateCalendarDays();
  const weekDays = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (view === '12h') {
          const displayHour = hour;
          slots.push(`${displayHour}:${minute.toString().padStart(2, '0')}`);
        } else {
          slots.push(`${hour}:${minute.toString().padStart(2, '0')}`);
        }
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const today = new Date();
  const monthName = today.toLocaleDateString('fr-FR', { month: 'long' });
  const year = today.getFullYear();

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Meeting booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[300]"
            style={{
              backdropFilter: 'blur(20px)',
              background: isDark
                ? 'rgba(10, 14, 39, 0.95)'
                : 'rgba(224, 242, 254, 0.95)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-6">
            <motion.div
              className="w-full max-w-5xl backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: isDark
                  ? 'rgba(10, 14, 39, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                }`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-[350px,1fr] h-[700px]">
                {/* Left Panel - Meeting Info */}
                <div className="p-8 border-r"
                  style={{
                    borderColor: isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(3, 105, 161, 0.2)',
                  }}
                >
                  <div className="flex items-start gap-4 mb-8">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isDark
                          ? 'rgba(6, 182, 212, 0.2)'
                          : 'rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      <span className={`text-xl ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                        YN
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Your Name
                      </h3>
                      <p className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        15 Min Intro meeting
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className={isDark ? 'text-gray-400' : 'text-slate-500'} />
                      <span className={isDark ? 'text-gray-300' : 'text-slate-700'}>
                        15min
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Video size={18} className={isDark ? 'text-gray-400' : 'text-slate-500'} />
                      <span className={isDark ? 'text-gray-300' : 'text-slate-700'}>
                        Google Meet
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={18} className={isDark ? 'text-gray-400' : 'text-slate-500'} />
                      <span className={isDark ? 'text-gray-300' : 'text-slate-700'}>
                        Africa/Algiers
                      </span>
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <motion.div
                      className="mt-8 p-4 rounded-xl"
                      style={{
                        background: isDark
                          ? 'rgba(6, 182, 212, 0.1)'
                          : 'rgba(6, 182, 212, 0.2)',
                        border: `1px solid ${
                          isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.4)'
                        }`,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        Selected
                      </div>
                      <div className={`text-lg ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                        {selectedDate.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          day: 'numeric',
                          month: 'long' 
                        })}
                      </div>
                      <div className={isDark ? 'text-white' : 'text-slate-900'}>
                        {selectedTime}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Panel - Calendar & Times */}
                <div className="relative">
                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg z-10"
                    style={{
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(15, 23, 42, 0.1)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                  </motion.button>

                  <div className="p-8 h-full overflow-y-auto">
                    {/* Calendar Header */}
                    <div className="mb-6">
                      <h3 className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        Sélectionner une date et une heure
                      </h3>
                      <div className="flex items-center justify-between">
                        <h2 className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {monthName} {year}
                        </h2>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setView('12h')}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              view === '12h'
                                ? isDark
                                  ? 'bg-white/10 text-white'
                                  : 'bg-slate-900/10 text-slate-900'
                                : isDark
                                ? 'text-gray-400'
                                : 'text-slate-500'
                            }`}
                          >
                            12 h
                          </button>
                          <button
                            onClick={() => setView('24h')}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              view === '24h'
                                ? isDark
                                  ? 'bg-white/10 text-white'
                                  : 'bg-slate-900/10 text-slate-900'
                                : isDark
                                ? 'text-gray-400'
                                : 'text-slate-500'
                            }`}
                          >
                            24 h
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {weekDays.map((day) => (
                        <div
                          key={day}
                          className={`text-xs text-center ${
                            isDark ? 'text-gray-500' : 'text-slate-500'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 mb-8">
                      {days.map(({ date, isCurrentMonth, isPast }, index) => (
                        <button
                          key={index}
                          onClick={() => !isPast && setSelectedDate(date)}
                          disabled={isPast || !isCurrentMonth}
                          className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? isDark
                                ? 'bg-white text-black'
                                : 'bg-slate-900 text-white'
                              : !isCurrentMonth || isPast
                              ? isDark
                                ? 'text-gray-700 cursor-not-allowed'
                                : 'text-slate-300 cursor-not-allowed'
                              : isDark
                              ? 'text-white hover:bg-white/10'
                              : 'text-slate-900 hover:bg-slate-900/5'
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      ))}
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          {selectedDate.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </div>
                        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                selectedTime === time
                                  ? isDark
                                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500'
                                    : 'bg-cyan-500/40 text-cyan-700 border border-cyan-500'
                                  : isDark
                                  ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                  : 'bg-slate-900/5 text-slate-900 hover:bg-slate-900/10 border border-slate-900/10'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Confirm Button */}
                    {selectedDate && selectedTime && (
                      <motion.button
                        onClick={handleBooking}
                        className="w-full mt-6 px-8 py-4 rounded-xl"
                        style={{
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(147, 51, 234, 0.4))'
                            : 'linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(147, 51, 234, 0.6))',
                          border: `1px solid ${
                            isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.7)'
                          }`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={isDark ? 'text-white' : 'text-slate-900'}>
                          Confirmer la réservation
                        </span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
