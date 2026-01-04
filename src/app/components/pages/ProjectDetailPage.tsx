import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  preloadedAssets: string[]; // NEW: Receive preloaded assets
}

export function ProjectDetailPage({ 
  isDark, 
  projectId, 
  onBack, 
  onProjectChange, 
  preloadedAssets 
}: ProjectDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  
  const project = projects.find(p => p.id === projectId);
  const categoryData = project ? CATEGORIES[project.category as keyof typeof CATEGORIES] : null;
  const categoryColors = categoryData ? getCategoryColors(categoryData.color) : null;

  // Use preloaded assets instead of manually loading
  useEffect(() => {
    console.log('ProjectDetailPage - Project ID:', projectId);
    console.log('ProjectDetailPage - Preloaded assets:', preloadedAssets);
    console.log('ProjectDetailPage - Project main image:', project?.image);

    if (preloadedAssets.length > 0) {
      // Sort to ensure main image is first
      const sortedAssets = [...preloadedAssets].sort((a, b) => {
        // Main image (without number suffix) should be first
        const aHasNumber = /_\d+\./.test(a);
        const bHasNumber = /_\d+\./.test(b);
        
        if (!aHasNumber && bHasNumber) return -1;
        if (aHasNumber && !bHasNumber) return 1;
        
        // If both have numbers, sort by number
        const aMatch = a.match(/_(\d+)\./);
        const bMatch = b.match(/_(\d+)\./);
        
        if (aMatch && bMatch) {
          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }
        
        return 0;
      });

      console.log('Sorted assets:', sortedAssets);
      setProjectImages(sortedAssets);
    } else if (project?.image) {
      // Fallback to main image if no preloaded assets
      console.log('Using fallback main image');
      setProjectImages([project.image]);
    } else {
      console.warn('No images found for project:', projectId);
      setProjectImages([]);
    }
  }, [preloadedAssets, projectId, project]);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [projectId]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  if (!project || !categoryData || !categoryColors) return null;
  // Auto-scroll images
  useEffect(() => {
    if (projectImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [projectImages.length]);
  return (
    <div className="min-h-screen px-8 py-32">
      <div className="max-w-[1600px] px-7 mx-auto">
        {/* Mobile Dropdown for Projects */}
        <div className="xl:hidden mb-6">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={`w-full flex items-center justify-between gap-3 px-6 py-3 rounded-xl border transition-all ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:border-white/20 text-white backdrop-blur-xl' 
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-900 backdrop-blur-xl'
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
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_3fr_1fr] gap-6 items-start">
          {/* Left Sidebar */}
          <aside className="hidden sticky top-32 xl:block">
            <motion.div
              className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border max-h-[calc(100vh-10rem)] overflow-y-auto
                         flex flex-col"
              style={{
                background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.2)',
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-3 mb-6 transition-all hover:opacity-80"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} className={isDark ? 'text-white' : 'text-slate-900'} />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Projects</span>
              </motion.button>

              {/* Divider */}
              <div 
                className="h-px mb-4"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.2)',
                }}
              />

              {/* Project List - Scrollable */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 min-h-0">
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
                      <div className="text-sm font-medium">{proj.id}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </aside>

          {/* Center - Images & Description */}
          <main className="space-y-6">
            {/* Images Section */}
            <motion.div
              className="backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border"
              style={{
                background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.2)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative h-[400px] md:h-[500px] group">
                <motion.img
                  key={currentImageIndex}
                  src={projectImages[currentImageIndex] || project.image}
                  alt={project.title}
                  className="w-full h-full sm:object-contain object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Navigation Arrows */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <ChevronLeft size={24} className={isDark ? 'text-white' : 'text-slate-900'} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <ChevronRight size={24} className={isDark ? 'text-white' : 'text-slate-900'} />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {projectImages.length > 1 && (
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
                )}
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              className="backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border"
              style={{
                background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.2)',
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
          </main>

          {/* Right Sidebar */}
          <aside className="hidden sticky top-32 xl:block">
            <motion.div
              className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl border max-h-[calc(100vh-10rem)] overflow-y-auto"
              style={{
                background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.2)',
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
                <div className="flex flex-wrap gap-2">
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
                      className="text-sm flex items-center gap-2 transition-colors hover:underline"
                      style={{
                        color: isDark ? categoryColors.dark : categoryColors.light,
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
                      className="text-sm flex items-center gap-2 transition-colors hover:underline"
                      style={{
                        color: isDark ? categoryColors.dark : categoryColors.light,
                      }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}