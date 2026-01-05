// CTASection.tsx
// File Location: src/app/components/common/CTASection.tsx

import { motion } from 'motion/react';
import { 
  Rocket, 
  Award, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Mail, 
  Phone, 
  Heart, 
  Code, 
  Briefcase, 
  Star 
} from 'lucide-react';
import React from 'react';

interface CTAFeature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  color: string;
}

interface CTASectionProps {
  isDark: boolean;
  title?: string;
  highlightedText?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  features?: CTAFeature[];
  iconComponent?: React.ComponentType<{ size?: number; className?: string }>;
  onOpenBooking: () => void;
  onOpenChat?: () => void;
  className?: string;
}

export function CTASection({
  isDark,
  title = 'Ready to Build Something',
  highlightedText = 'Extraordinary',
  description = "Let's turn your vision into reality.",
  primaryButtonText = 'Start Your Project',
  secondaryButtonText = 'Quick Chat',
  features = [],
  iconComponent: IconComponent = Rocket,
  onOpenBooking,
  onOpenChat,
  className = '',
}: CTASectionProps) {
  
  return (
    
    <motion.div
      className={`relative backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden ${className}`}
      style={{
        background: isDark
          ? 'rgba(10, 14, 39, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        border: `2px solid ${
          isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
        }`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #06b6d4, #8b5cf6, #ec4899, transparent)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          className="inline-block mb-6"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <IconComponent 
            size={50} 
            className={isDark ? 'text-cyan-400' : 'text-cyan-600'}
          />
        </motion.div>

        <h3
          className={`text-4xl md:text-5xl mb-6 font-bold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {highlightedText}
          </span>
          ?
        </h3>

        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-slate-700'
          }`}
        >
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="group relative px-10 py-5 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenBooking}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 text-white font-bold text-lg flex items-center">
              {primaryButtonText}
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </span>
          </motion.button>

          <motion.button
            className="group px-10 py-5 rounded-2xl backdrop-blur-xl shadow-lg border-2"
            style={{
              borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(6, 182, 212, 0.4)',
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenChat}
          >
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {secondaryButtonText}
            </span>
          </motion.button>
        </div>

        {features.length > 0 && (
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <feature.icon size={24} className={feature.color} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute top-10 right-10 w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)',
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)',
        }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Icon mapping helper
const iconMap: Record<string, React.ComponentType<any>> = {
  rocket: Rocket,
  mail: Mail,
  phone: Phone,
  heart: Heart,
  code: Code,
  briefcase: Briefcase,
  star: Star,
  award: Award,
  checkCircle: CheckCircle2,
  zap: Zap,
};

// Utility function to get icon component from string
export function getIcon(iconName: string) {
  return iconMap[iconName] || Rocket;
}