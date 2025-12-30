import { motion } from 'motion/react';
import { Code, Palette, Rocket, Zap, Brain, Database } from 'lucide-react';

interface ServicesPageProps {
  isDark: boolean;
}

export function ServicesPage({ isDark }: ServicesPageProps) {
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

  return (
    <div className="min-h-screen px-6 py-32">
      <div className="max-w-7xl mx-auto">
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
            Services
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group backdrop-blur-xl rounded-3xl p-8 shadow-2xl cursor-pointer"
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
          transition={{ duration: 0.8, delay: 0.7 }}
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
