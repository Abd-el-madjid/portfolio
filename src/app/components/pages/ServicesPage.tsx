import { motion, useInView } from 'motion/react';
import { Code, Palette, Rocket, Zap, Brain, Database, CheckCircle, Clock, Users, Award, Star, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ServicesPageProps {
  isDark: boolean;
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

export function ServicesPage({ isDark }: ServicesPageProps) {
  const stats = [
    { icon: Rocket, label: 'Projects Delivered', value: 25, suffix: '+', color: '#06b6d4' },
    { icon: Users, label: 'Satisfied Clients', value: 20, suffix: '+', color: '#8b5cf6' },
    { icon: Clock, label: 'Years Experience', value: 5, suffix: '+', color: '#10b981' },
    { icon: Star, label: 'Client Satisfaction', value: 98, suffix: '%', color: '#f59e0b' },
  ];

  const services = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description:
        'End-to-end development of scalable web applications using modern technologies like React, Django, and Flask. From backend architecture to responsive user interfaces.',
      color: '#06b6d4',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description:
        'Implementing intelligent systems using TensorFlow, scikit-learn, and OpenCV. From predictive models to computer vision applications.',
      color: '#8b5cf6',
    },
    {
      icon: Database,
      title: 'Database Design & Optimization',
      description:
        'Expert database architecture and optimization for MySQL, PostgreSQL, Oracle, and Firebase. Ensuring data integrity and performance at scale.',
      color: '#ec4899',
    },
    {
      icon: Palette,
      title: 'System Architecture',
      description:
        'Designing robust, scalable system architectures for enterprise-level applications. Focus on maintainability, performance, and future growth.',
      color: '#f59e0b',
    },
    {
      icon: Zap,
      title: 'Cloud Solutions',
      description:
        'AWS cloud infrastructure design and implementation. Building serverless architectures and optimizing cloud costs while maintaining reliability.',
      color: '#10b981',
    },
    {
      icon: Rocket,
      title: 'Technical Consulting',
      description:
        'Strategic guidance on technology decisions, architecture reviews, and team mentorship. Helping organizations build better software systems.',
      color: '#f43f5e',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'Working with this developer was an absolute pleasure. The AI solution delivered exceeded our expectations and significantly improved our operational efficiency.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO, DataFlow Solutions',
      content: 'Outstanding technical expertise and communication. The database optimization work resulted in 60% faster query times. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Product Manager, CloudScale',
      content: 'Delivered a complex full-stack application on time and within budget. The attention to detail and code quality was exceptional.',
      rating: 5,
    },
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your goals, requirements, and success criteria' },
    { step: '02', title: 'Planning', description: 'Creating detailed technical specifications and project roadmap' },
    { step: '03', title: 'Development', description: 'Building your solution with regular updates and feedback loops' },
    { step: '04', title: 'Delivery', description: 'Testing, deployment, and knowledge transfer to your team' },
  ];

  return (
    <div className="min-h-screen px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`text-5xl md:text-6xl mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Services & Expertise
          </h1>
          <div
            className="h-1 w-24 mx-auto rounded-full mb-8"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, rgba(6, 182, 212, 0.8), rgba(147, 51, 234, 0.8))'
                : 'linear-gradient(90deg, rgba(6, 182, 212, 1), rgba(147, 51, 234, 1))',
            }}
          />
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-slate-700'
            }`}
          >
            Comprehensive software engineering services from intelligent systems to cloud infrastructure
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center"
              style={{
                background: isDark
                  ? 'rgba(10, 14, 39, 0.6)'
                  : 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                }`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: `${stat.color}20` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon size={28} style={{ color: stat.color }} />
              </motion.div>
              <h3
                className={`text-4xl mb-2 font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </h3>
              <p
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group backdrop-blur-xl rounded-3xl p-8 shadow-2xl cursor-pointer relative"
              style={{
                background: isDark
                  ? 'rgba(10, 14, 39, 0.6)'
                  : 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                }`,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: isDark
                  ? `0 30px 60px ${service.color}40`
                  : `0 30px 60px ${service.color}30`,
              }}
            >
              {/* Icon Container */}
              <motion.div
                className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${service.color}20`,
                }}
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <service.icon size={32} style={{ color: service.color }} />
              </motion.div>

              {/* Content */}
              <h3
                className={`text-2xl mb-4 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-slate-700'
                }`}
              >
                {service.description}
              </p>

              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${service.color}30, transparent 70%)`,
                }}
              />

              {/* Bottom Accent Line */}
              <motion.div
                className="mt-6 h-1 rounded-full"
                style={{
                  background: service.color,
                  width: '0%',
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* How I Work Process */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2
            className={`text-4xl text-center mb-16 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            How I Work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div
                  className="text-6xl font-bold mb-4 opacity-20"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className={`text-2xl mb-3 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}
                >
                  {item.description}
                </p>
                {index < process.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <TrendingUp
                      size={24}
                      style={{
                        color: isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.7)',
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2
            className={`text-4xl text-center mb-16 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Client Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill="#f59e0b"
                      color="#f59e0b"
                    />
                  ))}
                </div>
                
                <p
                  className={`mb-6 italic ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}
                >
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-full mr-4"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    }}
                  />
                  <div>
                    <h4
                      className={`font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-slate-600'
                      }`}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center backdrop-blur-xl rounded-3xl p-12 shadow-2xl"
          style={{
            background: isDark
              ? 'rgba(10, 14, 39, 0.6)'
              : 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${
              isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
            }`,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3
            className={`text-3xl mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Ready to Build Something Amazing?
          </h3>
          <p
            className={`text-lg max-w-2xl mx-auto mb-8 ${
              isDark ? 'text-gray-300' : 'text-slate-700'
            }`}
          >
            Let's discuss how we can work together to bring your vision to life with intelligent, 
            scalable solutions.
          </p>
          <motion.button
            className="px-8 py-4 rounded-2xl backdrop-blur-xl shadow-lg"
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
            <span className={isDark ? 'text-white' : 'text-slate-900'}>
              Get in Touch
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}