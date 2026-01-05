import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageCircle, User, Mail } from 'lucide-react';
import { useState } from 'react';

interface QuickChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

// Telegram icon component
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  );
}

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export function QuickChatOverlay({ isOpen, onClose, isDark }: QuickChatOverlayProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState<'telegram' | 'whatsapp'>('telegram');

  // Your contact details - REPLACE THESE WITH YOUR ACTUAL INFO
  const TELEGRAM_USERNAME = 'your_telegram_username'; // e.g., 'john_doe'
  const WHATSAPP_NUMBER = '1234567890'; // e.g., '213555123456' (country code + number, no + or spaces)

  const handleSend = () => {
    if (!message.trim()) return;

    // Format the message
    const formattedMessage = `👤 Name: ${name || 'Anonymous'}
📧 Email: ${email || 'Not provided'}

💬 Message:
${message}`;

    const encodedMessage = encodeURIComponent(formattedMessage);

    // Open appropriate platform
    if (platform === 'telegram') {
      window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`, '_blank');
    } else {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }

    // Close overlay after a brief delay
    setTimeout(() => {
      onClose();
      setName('');
      setEmail('');
      setMessage('');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[9999] force-cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(20px)',
            background: isDark ? 'rgba(10,14,39,0.95)' : 'rgba(224,242,254,0.95)',
          }}
          onClick={onClose}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 pointer-events-none">
          <motion.div
            className="w-full backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto"
            style={{
              background: isDark ? 'rgba(10,14,39,0.95)' : 'rgba(255,255,255,0.95)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(3,105,161,0.2)'}`,
              maxWidth: '600px',
              maxHeight: '90vh',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="p-6 border-b flex items-center justify-between"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(3,105,161,0.2)' }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MessageCircle size={24} className="text-white" />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Quick Chat
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                    Send me a message instantly
                  </p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg"
                style={{ 
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
              </motion.button>
            </div>

            {/* Platform Selector */}
            <div className="p-6 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(3,105,161,0.2)' }}>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Choose your preferred platform:
              </p>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setPlatform('telegram')}
                  className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                    platform === 'telegram'
                      ? 'shadow-lg'
                      : isDark
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-slate-900/5 hover:bg-slate-900/10'
                  }`}
                  style={
                    platform === 'telegram'
                      ? { background: 'linear-gradient(135deg, #0088cc, #00acea)' }
                      : {}
                  }
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TelegramIcon className={`w-5 h-5 ${platform === 'telegram' ? 'text-white' : isDark ? 'text-gray-400' : 'text-slate-600'}`} />
                  <span className={`font-semibold ${platform === 'telegram' ? 'text-white' : isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Telegram
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => setPlatform('whatsapp')}
                  className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                    platform === 'whatsapp'
                      ? 'shadow-lg'
                      : isDark
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-slate-900/5 hover:bg-slate-900/10'
                  }`}
                  style={
                    platform === 'whatsapp'
                      ? { background: 'linear-gradient(135deg, #25D366, #128C7E)' }
                      : {}
                  }
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <WhatsAppIcon className={`w-5 h-5 ${platform === 'whatsapp' ? 'text-white' : isDark ? 'text-gray-400' : 'text-slate-600'}`} />
                  <span className={`font-semibold ${platform === 'whatsapp' ? 'text-white' : isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    WhatsApp
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {/* Name Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Your Name
                </label>
                <div className="relative">
                  <User 
                    size={18} 
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} 
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyan-400'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Your Email
                </label>
                <div className="relative">
                  <Mail 
                    size={18} 
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} 
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyan-400'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project or question..."
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border transition resize-none ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-cyan-400'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                />
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  Your message will be sent directly to my {platform === 'telegram' ? 'Telegram' : 'WhatsApp'}
                </p>
              </div>
            </div>

            {/* Footer with Send Button */}
            <div 
              className="p-6 border-t"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(3,105,161,0.2)' }}
            >
              <motion.button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`w-full px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition ${
                  !message.trim()
                    ? isDark
                      ? 'bg-white/5 text-gray-600 '
                      : 'bg-slate-900/5 text-slate-400 '
                    : 'text-white shadow-lg'
                }`}
                style={
                  message.trim()
                    ? {
                        background:
                          platform === 'telegram'
                            ? 'linear-gradient(135deg, #0088cc, #00acea)'
                            : 'linear-gradient(135deg, #25D366, #128C7E)',
                      }
                    : {}
                }
                whileHover={message.trim() ? { scale: 1.02, y: -2 } : {}}
                whileTap={message.trim() ? { scale: 0.98 } : {}}
              >
                <Send size={20} />
                Send via {platform === 'telegram' ? 'Telegram' : 'WhatsApp'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Demo
export default function Demo() {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="space-y-6 text-center">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-bold"
        >
          Toggle Theme
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
        >
          Open Quick Chat
        </button>

        <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
          <h3 className="font-bold mb-2">⚙️ Setup Instructions:</h3>
          <ol className="text-left text-sm space-y-2">
            <li>1. Replace <code className="bg-cyan-500/20 px-2 py-1 rounded">TELEGRAM_USERNAME</code> with your Telegram username</li>
            <li>2. Replace <code className="bg-green-500/20 px-2 py-1 rounded">WHATSAPP_NUMBER</code> with your WhatsApp number (format: country code + number, no +)</li>
            <li>3. Example WhatsApp: <code className="bg-green-500/20 px-2 py-1 rounded">213555123456</code> for +213 555 123 456</li>
          </ol>
        </div>
      </div>

      <QuickChatOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} isDark={isDark} />
    </div>
  );
}