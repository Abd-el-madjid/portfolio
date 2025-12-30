import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ProjectDetailPageProps {
  isDark: boolean;
  projectId: string;
  onBack: () => void;
  onProjectChange: (projectId: string) => void;
}

const projectData: Record<string, any> = {
  'cosmic-dashboard': {
    title: 'Cosmic Dashboard',
    subtitle: 'Real-time Analytics Platform',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop',
    ],
    description: 'A comprehensive real-time analytics platform designed for enterprise-level data visualization. Built with modern technologies to handle large-scale data streams with beautiful, intuitive visualizations that help teams make data-driven decisions quickly and confidently.',
    technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Redis', 'Node.js'],
    labels: ['Dashboard', 'Analytics', 'Real-time', 'Enterprise'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  'design-system': {
    title: 'Design System',
    subtitle: 'Enterprise Component Library',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
    ],
    description: 'A comprehensive design system featuring 50+ accessible React components with complete documentation. Built to ensure consistency across all products while maintaining flexibility for customization. Includes automated testing, Storybook integration, and detailed usage guidelines.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS', 'Jest', 'Testing Library'],
    labels: ['Design System', 'Components', 'Accessibility', 'Documentation'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  'ai-chat': {
    title: 'AI Chat Interface',
    subtitle: 'Conversational AI Platform',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1676277791608-ac36a2d7c999?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1675557009899-5b5cbc65b44d?w=1200&h=800&fit=crop',
    ],
    description: 'Modern chat interface for AI-powered conversations with support for streaming responses, conversation history, and markdown rendering. Handles 100k+ daily conversations with 99.9% uptime, providing users with instant, intelligent responses.',
    technologies: ['Next.js', 'OpenAI API', 'WebSocket', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    labels: ['AI', 'Chat', 'Machine Learning', 'Real-time'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  'ecommerce': {
    title: 'E-Commerce Platform',
    subtitle: 'Full-Featured Online Store',
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    ],
    description: 'Full-featured e-commerce platform with Stripe integration, inventory management, and comprehensive admin dashboard. Powers 50+ stores with $2M+ in monthly transactions, providing a seamless shopping experience for customers.',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'NextAuth', 'Vercel'],
    labels: ['E-Commerce', 'Payment', 'Full-Stack', 'SaaS'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  'ml-model': {
    title: 'Machine Learning Pipeline',
    subtitle: 'Automated ML Pipeline',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1200&h=800&fit=crop',
    ],
    description: 'Automated machine learning pipeline for predictive analytics with built-in model training, validation, and deployment. Streamlines the entire ML workflow from data preparation to production deployment with monitoring and retraining capabilities.',
    technologies: ['Python', 'TensorFlow', 'scikit-learn', 'AWS', 'Docker', 'Flask'],
    labels: ['Machine Learning', 'AI', 'Automation', 'Cloud'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  'telecom-system': {
    title: 'Telecom Management System',
    subtitle: 'Enterprise Telecommunications Platform',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=800&fit=crop',
    ],
    description: 'Enterprise-level telecommunications management system built for Ooredoo. Handles customer management, service provisioning, and network operations at telecom scale with high availability and performance.',
    technologies: ['Django', 'PostgreSQL', 'React', 'Redis', 'Celery', 'Docker'],
    labels: ['Enterprise', 'Telecom', 'Full-Stack', 'Scale'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
};

const allProjects = Object.keys(projectData);

export function ProjectDetailPage({ isDark, projectId, onBack, onProjectChange }: ProjectDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const project = projectData[projectId];

  if (!project) return null;

  return (
    <div className="min-h-screen px-6 py-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl backdrop-blur-xl"
          style={{
            background: isDark
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(15, 23, 42, 0.1)',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
          <span className={isDark ? 'text-white' : 'text-slate-900'}>Back to Projects</span>
        </motion.button>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr,320px] gap-6">
          {/* Left Sidebar - Project List */}
          <motion.div
            className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl h-fit lg:sticky lg:top-32"
            style={{
              background: isDark
                ? 'rgba(10, 14, 39, 0.8)'
                : 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${
                isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
              }`,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              All Projects
            </h3>
            <div className="space-y-2">
              {allProjects.map((id) => (
                <button
                  key={id}
                  onClick={() => onProjectChange(id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    id === projectId
                      ? isDark
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-cyan-500/30 text-cyan-700 border border-cyan-500/50'
                      : isDark
                      ? 'text-gray-300 hover:bg-white/5'
                      : 'text-slate-700 hover:bg-slate-900/5'
                  }`}
                >
                  <div className="text-sm">{projectData[id].title}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Center - Images & Description */}
          <div className="space-y-6">
            {/* Images Section */}
            <motion.div
              className="backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: isDark
                  ? 'rgba(10, 14, 39, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                }`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative h-[500px]">
                <img
                  src={project.images[currentImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="transition-all"
                      style={{
                        width: index === currentImageIndex ? '32px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background:
                          index === currentImageIndex
                            ? isDark
                              ? '#fff'
                              : '#0f172a'
                            : isDark
                            ? 'rgba(255, 255, 255, 0.3)'
                            : 'rgba(15, 23, 42, 0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
              style={{
                background: isDark
                  ? 'rgba(10, 14, 39, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${
                  isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                }`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2
                className={`text-3xl md:text-4xl mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {project.title}
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                {project.subtitle}
              </p>
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-slate-700'
                }`}
              >
                {project.description}
              </p>

              {/* Links */}
              <div className="flex gap-4 mt-8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-xl"
                  style={{
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(15, 23, 42, 0.1)',
                  }}
                >
                  <Github size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>GitHub</span>
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-xl"
                  style={{
                    background: isDark
                      ? 'rgba(6, 182, 212, 0.3)'
                      : 'rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <ExternalLink size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>Live Demo</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Technologies & Tags */}
          <motion.div
            className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl h-fit lg:sticky lg:top-32"
            style={{
              background: isDark
                ? 'rgba(10, 14, 39, 0.8)'
                : 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${
                isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
              }`,
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Technologies
            </h3>
            <div className="space-y-2 mb-8">
              {project.technologies.map((tech: string) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-xl"
                  style={{
                    background: isDark
                      ? 'rgba(6, 182, 212, 0.2)'
                      : 'rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <span className={isDark ? 'text-cyan-300' : 'text-cyan-700'}>
                    {tech}
                  </span>
                </div>
              ))}
            </div>

            <h3 className={`text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Labels
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.labels.map((label: string) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background: isDark
                      ? 'rgba(147, 51, 234, 0.2)'
                      : 'rgba(147, 51, 234, 0.3)',
                    color: isDark ? '#c084fc' : '#7c3aed',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
