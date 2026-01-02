import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface ProjectsPageProps {
  isDark: boolean;
  onProjectClick: (projectId: string) => void;
}

// Category definitions with their gradients
const CATEGORIES = {
  'AI & Telecom': { gradient: 'from-cyan-500 to-blue-600', color: 'cyan' },
  'UI/UX': { gradient: 'from-purple-500 to-pink-600', color: 'purple' },
  'AI & Web': { gradient: 'from-green-500 to-teal-600', color: 'green' },
  'Full-Stack': { gradient: 'from-orange-500 to-red-600', color: 'orange' },
  'AI & DevOps': { gradient: 'from-blue-500 to-indigo-600', color: 'blue' },
  'Enterprise': { gradient: 'from-violet-500 to-purple-600', color: 'violet' },
};

export function ProjectsPage({ isDark, onProjectClick }: ProjectsPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    Object.keys(CATEGORIES)
  );

  const projects = [
    {
      id: 'cosmic-dashboard',
      title: "RAVA – AI Anomaly Detection",
      description: "AI platform for real-time LTE KPI anomaly detection and intelligent alerting in telecom networks.",
      tech: ["Python", "TensorFlow", "Django", "React"],
      problem: "Manual KPI monitoring was inefficient and prone to missed anomalies in large-scale telecom networks.",
      solution: "Developed an AI-powered platform that automatically detects anomalies in real-time, reducing response time by 70%.",
      outcome: "Successfully deployed across Ooredoo Algeria's network, monitoring thousands of cell sites.",
      category: "AI & Telecom",
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      github: 'https://github.com/yourusername/rava',
      demo: 'https://rava-demo.com',
    },
    {
      id: 'design-system',
      title: 'Design System Pro',
      description: 'Comprehensive component library for enterprise applications with advanced theming.',
      tech: ['React', 'Storybook', 'Tailwind', 'TypeScript'],
      problem: "Inconsistent UI across multiple products led to poor user experience and slow development.",
      solution: "Built a scalable design system with 100+ components, comprehensive documentation, and automated testing.",
      outcome: "Reduced development time by 40% and improved UI consistency across 5 products.",
      category: "UI/UX",
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      github: 'https://github.com/yourusername/design-system',
      demo: 'https://design-system-demo.com',
    },
    {
      id: 'ai-chat',
      title: 'AI Chat Interface',
      description: 'Conversational AI platform with real-time streaming and natural language processing.',
      tech: ['Next.js', 'OpenAI', 'WebSocket', 'Redis'],
      problem: "Users needed a responsive, intelligent chat interface for complex queries and long conversations.",
      solution: "Created a streaming chat platform with context retention, markdown support, and real-time responses.",
      outcome: "Handling 10K+ daily conversations with 95% user satisfaction rate.",
      category: "AI & Web",
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      github: 'https://github.com/yourusername/ai-chat',
      demo: 'https://ai-chat-demo.com',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'Full-featured online store with payment integration and inventory management.',
      tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
      problem: "Small businesses lacked affordable, feature-rich e-commerce solutions.",
      solution: "Developed a complete platform with cart, checkout, payments, and admin dashboard.",
      outcome: "Powering 50+ online stores with $2M+ in processed transactions.",
      category: "Full-Stack",
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      github: 'https://github.com/yourusername/ecommerce',
      demo: 'https://ecommerce-demo.com',
    },
    {
      id: 'ml-model',
      title: 'Machine Learning Pipeline',
      description: 'Automated ML pipeline for predictive analytics with model versioning and monitoring.',
      tech: ['Python', 'TensorFlow', 'AWS', 'Docker'],
      problem: "Manual ML workflows were error-prone and hard to reproduce across environments.",
      solution: "Built end-to-end automated pipeline from data ingestion to model deployment.",
      outcome: "Reduced model training time by 60% and improved prediction accuracy by 25%.",
      category: "AI & DevOps",
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      github: 'https://github.com/yourusername/ml-pipeline',
      demo: 'https://ml-pipeline-demo.com',
    },
    {
      id: 'telecom-system',
      title: 'Telecom Management System',
      description: 'Enterprise system for telecommunications operations, billing, and customer management.',
      tech: ['Django', 'PostgreSQL', 'React', 'Celery'],
      problem: "Legacy telecom systems couldn't scale and lacked modern features.",
      solution: "Developed a modular system for billing, CRM, and network operations with REST API.",
      outcome: "Managing 100K+ subscribers with 99.9% uptime.",
      category: "Enterprise",
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      github: 'https://github.com/yourusername/telecom',
      demo: 'https://telecom-demo.com',
    },
  ];

  const filteredProjects = projects.filter((project) =>
    selectedCategories.includes(project.category)
  );

  const getCategoryColors = (color: string) => {
    const colorMap: Record<string, { dark: string; light: string; shadowDark: string; shadowLight: string }> = {
      cyan: { 
        dark: 'rgba(6, 182, 212, 1)', 
        light: 'rgba(8, 145, 178, 1)',
        shadowDark: 'rgba(6, 182, 212, 0.3)',
        shadowLight: 'rgba(6, 182, 212, 0.2)'
      },
      purple: { 
        dark: 'rgba(168, 85, 247, 1)', 
        light: 'rgba(147, 51, 234, 1)',
        shadowDark: 'rgba(168, 85, 247, 0.3)',
        shadowLight: 'rgba(168, 85, 247, 0.2)'
      },
      green: { 
        dark: 'rgba(16, 185, 129, 1)', 
        light: 'rgba(13, 148, 136, 1)',
        shadowDark: 'rgba(16, 185, 129, 0.3)',
        shadowLight: 'rgba(16, 185, 129, 0.2)'
      },
      orange: { 
        dark: 'rgba(251, 146, 60, 1)', 
        light: 'rgba(239, 68, 68, 1)',
        shadowDark: 'rgba(251, 146, 60, 0.3)',
        shadowLight: 'rgba(251, 146, 60, 0.2)'
      },
      blue: { 
        dark: 'rgba(59, 130, 246, 1)', 
        light: 'rgba(79, 70, 229, 1)',
        shadowDark: 'rgba(59, 130, 246, 0.3)',
        shadowLight: 'rgba(59, 130, 246, 0.2)'
      },
      violet: { 
        dark: 'rgba(139, 92, 246, 1)', 
        light: 'rgba(124, 58, 237, 1)',
        shadowDark: 'rgba(139, 92, 246, 0.3)',
        shadowLight: 'rgba(139, 92, 246, 0.2)'
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen px-7 py-32">
      <div className="max-w-7xl px-8 mx-auto">
        <motion.div
          className="text-center mb-12"
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

        {/* Category Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${
                    isDark 
                      ? 'bg-white/20 border-white/10 hover:border-white/20 text-white' 
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <span className="font-medium">Filter by Category</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ({selectedCategories.length})
                  </span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                align="start" 
                className={`min-w-[300px] p-4 ${
                  isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {Object.entries(CATEGORIES).map(([category, { gradient }]) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer group py-1"
                    >
                      <Checkbox
                        className={` 
                            ${isDark ? 'accent-white border-white data-[state=checked]:text-white' : 'accent-black border-black/10'}
                          `}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${gradient} text-white transition-opacity ${
                          selectedCategories.includes(category)
                            ? 'opacity-100'
                            : 'opacity-50'
                        } group-hover:opacity-100`}
                      >
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Selected Categories Badges */}
            {selectedCategories.length > 0 && (
              <>
                <div className={`h-6 w-px ${isDark ? 'bg-white/10' : 'bg-slate-300'}`} />
                
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => {
                    const categoryData = CATEGORIES[category as keyof typeof CATEGORIES];
                    return (
                      <motion.button
                        key={category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => toggleCategory(category)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${categoryData.gradient} text-white hover:opacity-80 transition-opacity`}
                      >
                        <span>{category}</span>
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                      </motion.button>
                    );
                  })}
                </div>

                {selectedCategories.length < Object.keys(CATEGORIES).length && (
                  <button
                    onClick={() => setSelectedCategories(Object.keys(CATEGORIES))}
                    className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Select All
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Projects Count */}
        <motion.div
          className={`text-center mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const categoryData = CATEGORIES[project.category as keyof typeof CATEGORIES];
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div
                  className={`rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer h-full flex flex-col ${
                    isDark ? 'bg-black/20 border-white/10' : 'bg-white border-slate-200'
                  }`}
                  onClick={() => onProjectClick(project.id)}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    const colors = getCategoryColors(categoryData.color);
                    target.style.borderColor = isDark ? colors.dark : colors.light;
                    target.style.boxShadow = isDark 
                      ? `0 8px 30px ${colors.shadowDark}`
                      : `0 8px 30px ${colors.shadowLight}`;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgb(226, 232, 240)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${categoryData.gradient} text-white font-medium`}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay with Links */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 space-x-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors line-clamp-2 ${
                        isDark
                          ? 'text-white group-hover:text-blue-400'
                          : 'text-slate-900 group-hover:text-blue-600'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 text-sm line-clamp-2 flex-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full"
                          style={{
                            background: isDark
                              ? 'rgba(59, 130, 246, 0.3)'
                              : 'rgba(219, 234, 254, 1)',
                            color: isDark ? '#93c5fd' : '#1e40af',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span
                          className="px-3 py-1 text-xs rounded-full"
                          style={{
                            background: isDark
                              ? 'rgba(59, 130, 246, 0.3)'
                              : 'rgba(219, 234, 254, 1)',
                            color: isDark ? '#93c5fd' : '#1e40af',
                          }}
                        >
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className={`text-xl ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              No projects found in the selected categories.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}