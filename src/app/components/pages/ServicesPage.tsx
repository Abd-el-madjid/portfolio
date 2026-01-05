// ServicesPage.tsx
// File Location: src/app/components/pages/ServicesPage.tsx
import { motion, useInView } from 'motion/react';
import { Code, Palette, Rocket, Zap, Brain, Database, Clock, Users, Star, Sparkles, Award, CheckCircle2, ArrowRight, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CTASection, getIcon } from '@/app/components/CTASection';
import { content } from '@/data/index';
gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  isDark: boolean;
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8), rgba(147, 51, 234, 0.8))',
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const iconMap: Record<string, any> = {
  Code,
  Brain,
  Database,
  Palette,
  Zap,
  Rocket,
  Sparkles,
  Clock,
  Users,
  Star,
};

const getServiceIcon = (title: string) => {
  if (title.includes('Full-Stack')) return Code;
  if (title.includes('AI')) return Brain;
  if (title.includes('Database')) return Database;
  if (title.includes('System')) return Palette;
  if (title.includes('Cloud')) return Zap;
  if (title.includes('Consulting')) return Rocket;
  return Code;
};

const getProcessIcon = (index: number) => {
  const icons = [Sparkles, Palette, Code, Rocket];
  return icons[index] || Sparkles;
};

export function ServicesPage({ isDark, onOpenBooking, onOpenChat }: ServicesPageProps) {
  const ctaContent = content.cta.services;
  const servicesContent = content.services;
  const ctaRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleBookingClick = () => {
    console.log('ServicesPage - Book a Meeting button clicked');
    onOpenBooking();
  };
  
  const handleQuickChat = () => {
    console.log('ServicesPage - Quick Chat button clicked');
    onOpenChat();
  };
  
  const features = ctaContent.features.map(f => ({
    icon: getIcon(f.icon),
    text: f.text,
    color: isDark ? f.colorDark : f.colorLight,
  }));
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentProcessStep, setCurrentProcessStep] = useState(0);
  const processRef = useRef<HTMLDivElement>(null);
  const processCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = content.stats.map((stat, index) => {
    const colors = [
      { color: '#06b6d4', gradient: 'from-cyan-500 to-blue-500', icon: Rocket },
      { color: '#8b5cf6', gradient: 'from-purple-500 to-pink-500', icon: Users },
      { color: '#10b981', gradient: 'from-emerald-500 to-teal-500', icon: Clock },
      { color: '#f59e0b', gradient: 'from-amber-500 to-orange-500', icon: Star },
    ];
    return {
      ...stat,
      ...colors[index],
    };
  });

  const services = content.servicesList.map((service, index) => {
    const colors = [
      { color: '#06b6d4', gradient: 'from-cyan-500 via-blue-500 to-indigo-500' },
      { color: '#8b5cf6', gradient: 'from-purple-500 via-pink-500 to-rose-500' },
      { color: '#ec4899', gradient: 'from-pink-500 via-rose-500 to-red-500' },
      { color: '#f59e0b', gradient: 'from-amber-500 via-orange-500 to-yellow-500' },
      { color: '#10b981', gradient: 'from-emerald-500 via-teal-500 to-cyan-500' },
      { color: '#f43f5e', gradient: 'from-rose-500 via-red-500 to-pink-500' },
    ];
    return {
      icon: getServiceIcon(service.title),
      title: service.title,
      description: service.description,
      features: service.features,
      ...colors[index],
    };
  });

  const testimonials = content.testimonials;

  const processSteps = content.process.map((step, index) => ({
    ...step,
    icon: getProcessIcon(index),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (!processRef.current) return;

    const steps = processCardsRef.current.filter(Boolean) as HTMLDivElement[];
    
    const initScrollAnimations = () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) {
                setCurrentProcessStep(index);
              }
            },
          });
        });
      } else {
        steps.forEach((step, i) => {
          step.classList.toggle('active', i === 0);
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top top',
            end: `+=${steps.length * 100}%`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        steps.forEach((_, index) => {
          tl.to(
            {},
            {
              duration: 1,
              onUpdate: () => {
                steps.forEach((step, i) => {
                  step.classList.toggle('active', i === index);
                });
              },
            }
          );
        });
      }
    };

    initScrollAnimations();

    const handleResize = () => {
      initScrollAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="min-h-screen px-7 py-32 relative overflow-hidden">
      <div className="max-w-7xl px-8 mx-auto">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingParticle delay={0} duration={4} x="10%" y="20%" />
          <FloatingParticle delay={1} duration={5} x="85%" y="30%" />
          <FloatingParticle delay={2} duration={4.5} x="15%" y="60%" />
          <FloatingParticle delay={1.5} duration={5.5} x="90%" y="70%" />
          <FloatingParticle delay={0.5} duration={4.8} x="50%" y="85%" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-18 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={40} />
            </motion.div>
            
            <h1
              className={`text-5xl  mb-6 font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {servicesContent.title.split('&')[0]} &{' '}
              <span
                className="inline-block"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)'
                    : 'linear-gradient(135deg, #0891b2, #7c3aed, #db2777)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '100% 200%',
                  animation: 'gradient 3s ease infinite',
                }}
              >
                {servicesContent.title.split('&')[1].trim()}
              </span>
            </h1>
            
            <motion.div
              className="h-2 w-32 mx-auto rounded-full mb-10"
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)'
                  : 'linear-gradient(90deg, #0891b2, #7c3aed, #db2777)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            <p
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-slate-700'
              }`}
            >
              {servicesContent.subtitle}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-32"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl cursor-pointer overflow-hidden"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.7)'
                    : 'rgba(255, 255, 255, 0.7)',
                  border: `2px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -12,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${stat.color}, transparent 70%)`,
                  }}
                />

                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center relative z-10"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}30, ${stat.color}10)`,
                  }}
                  whileHover={{ 
                    rotate: 360,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon size={32} style={{ color: stat.color }} />
                </motion.div>
                
                <h3
                  className={`text-4xl md:text-5xl mb-2 font-bold relative z-10 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </h3>
                
                <p
                  className={`text-xs md:text-sm font-medium relative z-10 ${
                    isDark ? 'text-gray-400' : 'text-slate-600'
                  }`}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2
              className={`text-4xl md:text-5xl text-center mb-6 font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {servicesContent.sections.whatIOffer.title}
            </motion.h2>
            <p className={`text-center text-lg mb-16 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {servicesContent.sections.whatIOffer.subtitle}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group relative backdrop-blur-xl rounded-3xl p-8 shadow-2xl cursor-pointer overflow-hidden"
                  style={{
                    background: isDark
                      ? 'rgba(10, 14, 39, 0.7)'
                      : 'rgba(255, 255, 255, 0.7)',
                    border: `2px solid ${
                      isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                    }`,
                  }}
                  initial={{ opacity: 0, y: 80, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${service.gradient}`}
                    transition={{ duration: 0.4 }}
                  />

                  <motion.div
                    className="mb-6 w-20 h-20 rounded-3xl flex items-center justify-center relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.15,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon size={36} style={{ color: service.color }} />
                  </motion.div>

                  <h3
                    className={`text-2xl md:text-3xl mb-4 font-bold relative z-10 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {service.title}
                  </h3>
                  
                  <p
                    className={`leading-relaxed mb-6 relative z-10 ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6 relative z-10">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 + i * 0.05 }}
                      >
                        <CheckCircle2 size={16} style={{ color: service.color }} />
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="flex items-center space-x-2 relative z-10 group/btn cursor-pointer"
                    whileHover={{ x: 10 }}
                    onClick={scrollToCTA}
                  >
                    <span 
                      className="font-semibold text-sm"
                      style={{ color: service.color }}
                    >
                      Learn More
                    </span>
                    <ArrowRight 
                      size={16} 
                      style={{ color: service.color }}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `radial-gradient(circle at center, ${service.color}40, transparent 70%)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div ref={processRef} className="mb-32 relative">
            <motion.h2
              className={`text-4xl md:text-5xl text-center mb-6 font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {servicesContent.sections.myProcess.title}
            </motion.h2>
            <motion.p 
              className={`text-center text-lg mb-16 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="hidden lg:inline">{servicesContent.sections.myProcess.subtitle}</span>
              <span className="lg:hidden">Scroll through each step</span>
            </motion.p>

            <div className="relative">
              <div 
                className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
                style={{
                  background: isDark 
                    ? 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #10b981)'
                    : 'linear-gradient(90deg, #0891b2, #7c3aed, #db2777, #059669)',
                  opacity: 0.3,
                }}
              />

              <div className="lg:hidden space-y-[100vh]">
                {processSteps.map((item, index) => (
                  <div
                    key={item.step}
                    ref={(el) => {
                      processCardsRef.current[index] = el;
                    }}
                    className="min-h-screen flex items-center justify-center px-4"
                  >
                    <motion.div
                      className="relative backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-hidden w-full max-w-md"
                      style={{
                        background: isDark
                          ? 'rgba(10, 14, 39, 0.8)'
                          : 'rgba(255, 255, 255, 0.8)',
                        border: `2px solid ${
                          isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                        }`,
                        opacity: currentProcessStep === index ? 1 : 0.3,
                        scale: currentProcessStep === index ? 1 : 0.9,
                      }}
                      animate={{
                        opacity: currentProcessStep === index ? 1 : 0.3,
                        scale: currentProcessStep === index ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10"
                        style={{
                          background: `linear-gradient(135deg, ${stats[index].color}, ${stats[index].color}80)`,
                        }}
                        animate={currentProcessStep === index ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon size={28} className="text-white" />
                      </motion.div>

                      <div
                        className="text-5xl font-bold mb-4 opacity-20 text-center"
                        style={{
                          background: `linear-gradient(135deg, ${stats[index].color}, transparent)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {item.step}
                      </div>
                      
                      <h3
                        className={`text-2xl mb-4 text-center font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </h3>
                      
                      <p
                        className={`text-center leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-slate-700'
                        }`}
                      >
                        {item.description}
                      </p>

                      <motion.div
                        className="absolute inset-0 opacity-0 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at center, ${stats[index].color}, transparent 70%)`,
                          opacity: currentProcessStep === index ? 0.3 : 0,
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="hidden lg:grid grid-cols-4 gap-8">
                {processSteps.map((item, index) => (
                  <div
                    key={item.step}
                    ref={(el) => {
                      processCardsRef.current[index] = el;
                    }}
                    className="process-step relative backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-hidden group cursor-pointer"
                    style={{
                      background: isDark
                        ? 'rgba(10, 14, 39, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)',
                      border: `2px solid ${
                        isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                      }`,
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -15,
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out',
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                      });
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${stats[index].color}, ${stats[index].color}80)`,
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon size={28} className="text-white" />
                    </motion.div>

                    <div
                      className="text-5xl font-bold mb-4 opacity-20 text-center"
                      style={{
                        background: `linear-gradient(135deg, ${stats[index].color}, transparent)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {item.step}
                    </div>
                    
                    <h3
                      className={`text-2xl mb-4 text-center font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h3>
                    
                    <p
                      className={`text-center leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-slate-700'
                      }`}
                    >
                      {item.description}
                    </p>

                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${stats[index].color}, transparent 70%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2
              className={`text-4xl md:text-5xl text-center mb-6 font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {servicesContent.sections.clientLove.title}
            </h2>
            <p className={`text-center text-lg mb-16 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {servicesContent.sections.clientLove.subtitle}
            </p>

            <div className="max-w-4xl mx-auto">
              <motion.div
                className="relative backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.8)'
                    : 'rgba(255, 255, 255, 0.8)',
                  border: `2px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Quote 
                  size={60} 
                  className={`absolute top-8 left-8 opacity-10 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}
                />

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                    >
                      <Star
                        size={28}
                        fill="#f59e0b"
                        color="#f59e0b"
                        className="mx-1"
                      />
                    </motion.div>
                  ))}
                </div>

                <p
                  className={`text-xl md:text-2xl mb-8 text-center leading-relaxed italic ${
                    isDark ? 'text-gray-200' : 'text-slate-800'
                  }`}
                >
                  "{testimonials[activeTestimonial].content}"
                </p>

                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mr-4 text-3xl"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {testimonials[activeTestimonial].image}
                  </motion.div>
                  <div className="text-left">
                    <h4
                      className={`font-bold text-lg ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-slate-600'
                      }`}
                    >
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, #06b6d4, #8b5cf6, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className="group"
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: activeTestimonial === index 
                          ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)'
                          : isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                      }}
                      whileHover={{ scale: 1.5 }}
                      animate={activeTestimonial === index ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.5, repeat: activeTestimonial === index ? Infinity : 0 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div ref={ctaRef}>
            <CTASection
              isDark={isDark}
              iconComponent={getIcon(ctaContent.icon)}
              title={ctaContent.title}
              highlightedText={ctaContent.highlightedText}
              description={ctaContent.description}
              primaryButtonText={ctaContent.buttons.primary}
              secondaryButtonText={ctaContent.buttons.secondary}
              features={features}
              onOpenBooking={handleBookingClick}
              onOpenChat={handleQuickChat}
            />
          </div>
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </section>
  );
}