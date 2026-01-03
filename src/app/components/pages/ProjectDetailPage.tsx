import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { projects } from '@/data/index';
import { CATEGORIES } from '@/data/categories';
import { getCategoryColors } from '@/lib/colors';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface ProjectDetailPageProps {
  isDark: boolean;
  projectId: string;
  onBack: () => void;
  onProjectChange: (projectId: string) => void;
}

export function ProjectDetailPage({ isDark, projectId, onBack, onProjectChange }: ProjectDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const project = projects.find(p => p.id === projectId);
  const categoryData = project ? CATEGORIES[project.category as keyof typeof CATEGORIES] : null;
  const categoryColors = categoryData ? getCategoryColors(categoryData.color) : null;

  if (!project || !categoryData || !categoryColors) return null;

  // Get project images - use the main image multiple times if folder not available
  const projectImages = [project.image, project.image, project.image];

  return (
    <div className="min-h-screen px-8 py-32">
      <div className="max-w-[1600px] px-7 mx-auto">
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

        {/* Mobile Dropdown for Projects (visible on smaller screens) */}
        <div className="xl:hidden mb-6">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={`w-full flex items-center justify-between gap-3 px-6 py-3 rounded-xl border transition-all ${
                  isDark 
                    ? 'bg-white/10 border-white/10 hover:border-white/20 text-white' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                }`}
              >
                <span className="font-medium">{project.title}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              align="start" 
              className={`w-full max-w-md p-2 ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-1">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onProjectChange(proj.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      proj.id === projectId
                        ? isDark
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-cyan-500/30 text-cyan-700'
                        : isDark
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 3-Column Layout */}
        <div className="flex flex-col xl:flex-row gap-6 items-start relative">
          {/* Left Sidebar - Project List */}
          <motion.div
            className="hidden xl:block xl:sticky xl:top-32 w-full xl:w-1/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl self-start"
            style={{
              maxHeight: 'calc(100vh - 10rem)',
              overflowY: 'auto',
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
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Projects
            </h3>
            <div className="space-y-2">
              {projects.map((proj) => {
                const isSelected = proj.id === projectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => onProjectChange(proj.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      isSelected
                        ? 'border'
                        : isDark
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    style={
                      isSelected
                        ? {
                            color: isDark ? categoryColors.dark : categoryColors.light,
                            borderColor: isDark ? categoryColors.dark : categoryColors.light,
                          }
                        : {}
                    }
                  >
                    <div className="text-sm font-medium">{proj.title}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Center - Images & Description */}
          <div className="w-full xl:w-3/5 space-y-6 xl:min-h-screen">
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
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src={projectImages[currentImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {projectImages.map((_: any, index: number) => (
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
              className="backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl"
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
                className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {project.title}
              </h2>
              
              {/* Category Badge */}
              <div className="mb-6">
                <span
                  className={`inline-block px-4 py-1.5 text-sm rounded-full bg-gradient-to-r ${categoryData.gradient} text-white font-medium`}
                >
                  {project.category}
                </span>
              </div>

              {/* Description Sections */}
              <div className="space-y-6">
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Overview
                  </h3>
                  <p
                    className={`text-base leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {project.problem && (
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Problem
                    </h3>
                    <p
                      className={`text-base leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-slate-700'
                      }`}
                    >
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Solution
                    </h3>
                    <p
                      className={`text-base leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-slate-700'
                      }`}
                    >
                      {project.solution}
                    </p>
                  </div>
                )}

                {project.outcome && (
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Outcome
                    </h3>
                    <p
                      className={`text-base leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-slate-700'
                      }`}
                    >
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 mt-8">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-xl transition-all hover:scale-105"
                    style={{
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(15, 23, 42, 0.1)',
                    }}
                  >
                    <Github size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>GitHub</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-xl transition-all hover:scale-105"
                    style={{
                      background: isDark
                        ? 'rgba(6, 182, 212, 0.3)'
                        : 'rgba(6, 182, 212, 0.4)',
                    }}
                  >
                    <ExternalLink size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Technologies & Tags */}
          <motion.div
            className="xl:sticky xl:top-32 w-full xl:w-1/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl self-start"
            style={{
              maxHeight: 'calc(100vh - 10rem)',
              overflowY: 'auto',
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
            {/* Technologies */}
            <div className="mb-8">
              <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium rounded-lg border transition-all hover:scale-105"
                    style={{
                      borderColor: isDark ? categoryColors.dark : categoryColors.light,
                      color: isDark ? categoryColors.dark : categoryColors.light,
                      backgroundColor: 'transparent',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="mb-8">
              <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Category
              </h3>
              <span
                className={`inline-block px-4 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r ${categoryData.gradient} text-white`}
              >
                {project.category}
              </span>
            </div>

            {/* Project Links */}
            <div>
              <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Links
              </h3>
              <div className="space-y-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-2 transition-colors"
                    style={{
                      color: isDark ? categoryColors.dark : categoryColors.light,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    <Github size={16} />
                    Repository
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-2 transition-colors"
                    style={{
                      color: isDark ? categoryColors.dark : categoryColors.light,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}