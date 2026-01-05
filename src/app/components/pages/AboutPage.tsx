import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, MapPin, Award, Briefcase, Globe, Code2, Database, Cloud, Layers, Brain, Compass, Rocket, Users, Lightbulb, Target, Heart } from 'lucide-react';
import { content } from '@/data/index';

interface AboutPageProps {
  isDark?: boolean;
}

export function AboutPage({ isDark = false }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState('journey');

  const iconMap: Record<string, any> = {
    'Code2': Code2,
    'Layers': Layers,
    'Database': Database,
    'Cloud': Cloud,
    'Users': Users,
    'Lightbulb': Lightbulb,
    'Globe': Globe,
    'Target': Target,
  };

  return (
    <section className="min-h-screen px-7 py-32">
      <div className="max-w-7xl px-8 mx-auto space-y-16">
        
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-5xl md:text-6xl mb-6 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.about.title}
          </h1>
          <div
            className="h-1 w-24 mx-auto rounded-full mb-8"
            style={{
              background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.8), rgba(147, 51, 234, 0.8), rgba(217, 70, 239, 0.8))'
            }}/>
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            {content.about.introduction.map((paragraph, index) => {
              // Handle special formatting for first paragraph
              if (index === 0) {
                return (
                  <p key={index} className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Hi, I'm <span className="text-cyan-500 font-semibold">Abd El Madjid Kahoul</span>, an AI & software graduate who enjoys figuring out how systems work—and making them work better.
                  </p>
                );
              }
              
              // Handle paragraph with highlights (index 2)
              if (index === 2) {
                return (
                  <p key={index} className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                    I like working at the intersection of{' '}
                    <span className={isDark ? 'text-violet-400' : 'text-violet-600'}>artificial intelligence</span>,{' '}
                    <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>backend engineering</span>, and{' '}
                    <span className={isDark ? 'text-fuchsia-400' : 'text-fuchsia-600'}>real-world problems</span>—building systems that don't just run, but <strong>adapt and scale</strong>.
                  </p>
                );
              }
              
              return (
                <p key={index} className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {paragraph}
                </p>
              );
            })}

            <div className={`flex items-center gap-3 pt-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              <Heart className="w-5 h-5" />
              <p className="text-base italic">
                {content.personal.motto}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tab Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveTab('skills')}
            className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
              activeTab === 'skills'
                ? 'border-violet-500/50 shadow-lg shadow-violet-500/20 scale-105'
                : isDark ? 'border-white/10 hover:border-white/20' : 'border-slate-200 hover:border-slate-300'
            } ${isDark ? 'bg-black/20' : 'bg-white'}`}
          >
            <Brain className="w-10 h-10 text-violet-500 mb-4" />
            <h3 className={`text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{content.about.tabs.skills.title}</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {content.about.tabs.skills.description}
            </p>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
              activeTab === 'journey'
                ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-105'
                : isDark ? 'border-white/10 hover:border-white/20' : 'border-slate-200 hover:border-slate-300'
            } ${isDark ? 'bg-black/20' : 'bg-white'}`}
          >
            <Compass className="w-10 h-10 text-cyan-500 mb-4" />
            <h3 className={`text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{content.about.tabs.journey.title}</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {content.about.tabs.journey.description}
            </p>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
              activeTab === 'achievements'
                ? 'border-fuchsia-500/50 shadow-lg shadow-fuchsia-500/20 scale-105'
                : isDark ? 'border-white/10 hover:border-white/20' : 'border-slate-200 hover:border-slate-300'
            } ${isDark ? 'bg-black/20' : 'bg-white'}`}
          >
            <Award className="w-10 h-10 text-fuchsia-500 mb-4" />
            <h3 className={`text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{content.about.tabs.achievements.title}</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {content.about.tabs.achievements.description}
            </p>
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Education */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-cyan-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{content.about.sections.education}</h2>
                </div>
                <div className="space-y-6">
                  {content.education.map((edu, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 ${isDark ? 'bg-black/20' : 'bg-white'}`}
                    >
                      <div className="flex justify-between items-start mb-3 flex-wrap gap-3">
                        <div className="flex-1">
                          <h3 className={`text-xl mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{edu.degree}</h3>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm px-3 py-1 rounded-full ${isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                            {edu.period}
                          </span>
                          <p className={`text-xs mt-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{edu.grade}</p>
                        </div>
                      </div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Work Experience */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-8 h-8 text-cyan-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{content.about.sections.workExperience}</h2>
                </div>
                <div className="space-y-8 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent hidden md:block" />

                  {content.workExperience.map((job, index) => (
                    <div key={index} className="relative md:pl-12">
                      <div className={`hidden md:block absolute left-0 top-6 w-3 h-3 -ml-1.5 bg-cyan-500 rounded-full border-4 ${isDark ? 'border-slate-950' : 'border-white'}`} />

                      <div className={`p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all ${isDark ? 'bg-black/20' : 'bg-white'}`}>
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className={`text-2xl mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{job.position}</h3>
                              <div className={`flex items-center gap-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                                <Briefcase className="w-4 h-4" />
                                <span>{job.company}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>{job.period}</div>
                              <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                <MapPin className="w-3 h-3" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                          </div>

                          <p className={`leading-relaxed ${isDark ? 'text-white/70' : 'text-slate-700'}`}>{job.description}</p>

                          <ul className="space-y-2">
                            {job.highlights.map((highlight, idx) => (
                              <li key={idx} className={`flex items-start gap-2 text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                <span className="text-cyan-500 mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {job.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={`px-3 py-1 text-xs rounded-full ${isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Technical Skills */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-violet-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{content.about.sections.technicalProficiency}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.technicalSkills.map((category, index) => {
                    const IconComponent = iconMap[category.title.split(' ').join('')] || Code2;
                    return (
                      <div
                        key={index}
                        className={`p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/50 transition-all ${isDark ? 'bg-black/20' : 'bg-white'}`}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <IconComponent className={`w-7 h-7 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                          <h3 className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`px-4 py-2 rounded-xl text-sm ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-50 text-violet-700'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Soft Skills */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-violet-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{content.about.sections.softSkills}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.softSkills.map((skill, index) => {
                    const IconComponent = iconMap[skill.title] || Users;
                    return (
                      <div
                        key={index}
                        className={`p-6 rounded-2xl border border-violet-500/20 hover:border-violet-500/50 transition-all group ${isDark ? 'bg-black/20' : 'bg-white'}`}
                      >
                        <IconComponent className={`w-8 h-8 mb-3 group-hover:scale-110 transition-transform ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                        <h3 className={`text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{skill.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{skill.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Certifications */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-fuchsia-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{content.about.sections.certifications}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all ${isDark ? 'bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10' : 'bg-gradient-to-br from-fuchsia-50 to-violet-50'}`}
                    >
                      <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {cert.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {cert.issuer} {cert.year && `• ${cert.year}`}
                      </p>
                      <p className={`text-sm mt-2 ${isDark ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>{cert.level}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-fuchsia-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{content.about.sections.languages}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {content.languages.map((lang, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all ${isDark ? 'bg-black/20' : 'bg-white'}`}
                    >
                      <div className={`text-4xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang.flag}</div>
                      <div className="flex justify-between items-center">
                        <span className={`text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang.name}</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>{lang.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}