import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface ProjectsPageProps {
  isDark: boolean;
  onProjectClick: (projectId: string) => void;
}

export function ProjectsPage({ isDark, onProjectClick }: ProjectsPageProps) {
  const projects = [
    {
      id: 'cosmic-dashboard',
      title: 'Cosmic Dashboard',
      description: 'Real-time analytics platform with beautiful data visualizations',
      tags: ['React', 'TypeScript', 'D3.js'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      id: 'design-system',
      title: 'Design System',
      description: 'Comprehensive component library for enterprise applications',
      tags: ['React', 'Storybook', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    },
    {
      id: 'ai-chat',
      title: 'AI Chat Interface',
      description: 'Conversational AI platform with real-time streaming',
      tags: ['Next.js', 'OpenAI', 'WebSocket'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    },
    {
      id: 'ml-model',
      title: 'Machine Learning Pipeline',
      description: 'Automated ML pipeline for predictive analytics',
      tags: ['Python', 'TensorFlow', 'AWS'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    },
    {
      id: 'telecom-system',
      title: 'Telecom Management System',
      description: 'Enterprise system for telecommunications operations',
      tags: ['Django', 'PostgreSQL', 'React'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
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
            Projects
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
            A selection of projects showcasing intelligent systems, full-stack development, and scalable architectures
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
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
              onClick={() => onProjectClick(project.id)}
              whileHover={{
                y: -10,
                boxShadow: isDark
                  ? '0 30px 60px rgba(255, 255, 255, 0.1)'
                  : '0 30px 60px rgba(3, 105, 161, 0.2)',
              }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: isDark
                      ? 'rgba(10, 14, 39, 0.8)'
                      : 'rgba(255, 255, 255, 0.8)',
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex items-center gap-2 px-6 py-3 rounded-full"
                    style={{
                      background: isDark
                        ? 'rgba(6, 182, 212, 0.3)'
                        : 'rgba(6, 182, 212, 0.5)',
                      border: `1px solid ${
                        isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.8)'
                      }`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>
                      View Details
                    </span>
                    <ExternalLink size={16} className={isDark ? 'text-white' : 'text-slate-900'} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className={`text-2xl mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mb-4 ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: isDark
                          ? 'rgba(6, 182, 212, 0.2)'
                          : 'rgba(6, 182, 212, 0.3)',
                        color: isDark ? '#67e8f9' : '#0e7490',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: isDark
                    ? 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3), transparent 70%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2), transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
