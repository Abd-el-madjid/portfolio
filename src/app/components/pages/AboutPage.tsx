import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, MapPin, Award, Briefcase, Globe, Code2, Database, Cloud, Layers, Brain, Compass, Rocket, Users, Lightbulb, Target, Heart } from 'lucide-react';

interface AboutPageProps {
  isDark?: boolean;
}

export  function AboutPage({ isDark = false }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState('journey');

  const education = [
    {
      degree: "Master's in Software Engineering & Intelligent Systems",
      institution: "University of Constantine 2",
      period: "2023 – 2025",
      grade: "Top Class B",
      description: "Advanced studies in AI, system architecture, and intelligent systems design"
    },
    {
      degree: "Bachelor's in Software Engineering",
      institution: "University of Constantine 2",
      period: "2020 – 2023",
      grade: "Class A",
      description: "Foundation in software development, algorithms, and system design"
    },
    {
      degree: "Baccalaureate in Experimental Sciences",
      institution: "Kateb Yacine High School",
      period: "2019 – 2020",
      grade: "Mention Bien",
      description: "Strong foundation in mathematics and sciences"
    }
  ];

  const workExperience = [
    {
      company: "Ooredoo Algeria",
      position: "AI Developer Intern",
      location: "Constantine, Algeria",
      period: "Apr 2025 - Jul 2025",
      description: "Contributed to RAVA AI platform for LTE anomaly detection in telecommunications infrastructure.",
      highlights: [
        "Developed AI models for detecting anomalies in LTE KPIs using TensorFlow",
        "Processed and analyzed large-scale telecom datasets for pattern recognition",
        "Collaborated with telecom engineering teams for seamless platform integration"
      ],
      technologies: ["Python", "TensorFlow", "Django", "React", "PostgreSQL"]
    },
    {
      company: "Create DZ",
      position: "Full-Stack Developer Intern",
      location: "Constantine, Algeria",
      period: "Jul 2024 - Sep 2024",
      description: "Developed ERP modules for enterprise resource planning system.",
      highlights: [
        "Built responsive ERP modules using React.js and Django framework",
        "Designed and optimized MySQL database schemas for business operations",
        "Participated in requirement analysis and agile feature development cycles"
      ],
      technologies: ["React.js", "Django", "MySQL", "JavaScript"]
    },
    {
      company: "University of Constantine 2",
      position: "Backend Developer Intern",
      location: "Constantine, Algeria",
      period: "Sep 2023 - Dec 2023",
      description: "Created comprehensive laboratory management application for the Rector's office.",
      highlights: [
        "Designed and implemented RESTful APIs for lab management system",
        "Developed secure authentication and authorization mechanisms",
        "Built database architecture for tracking lab resources and schedules"
      ],
      technologies: ["Django", "MySQL", "JavaScript", "HTML", "CSS"]
    }
  ];

  const technicalSkills = [
    {
      icon: Code2,
      title: "Programming Languages",
      skills: ["Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"]
    },
    {
      icon: Layers,
      title: "Frameworks & Tools",
      skills: ["Django", "Flask", "React", "Bootstrap", "Git", "Jira", "Figma"]
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["MySQL", "PostgreSQL", "Oracle", "Firebase"]
    },
    {
      icon: Cloud,
      title: "AI & Data Science",
      skills: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "OpenCV"]
    }
  ];

  const softSkills = [
    {
      icon: Users,
      title: "Leadership",
      description: "Leading team initiatives and mentoring colleagues"
    },
    {
      icon: Lightbulb,
      title: "Problem-Solving",
      description: "Analytical thinking and creative solutions to complex challenges"
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Collaborative approach to achieving shared goals"
    },
    {
      icon: Globe,
      title: "Communication",
      description: "Clear technical communication across diverse teams"
    },
    {
      icon: Target,
      title: "Adaptability",
      description: "Quick learner, embracing new technologies and methodologies"
    }
  ];

  const languages = [
    { name: "Arabic", level: "Native", flag: "🇩🇿" },
    { name: "English", level: "Professional", flag: "🇬🇧" },
    { name: "French", level: "TCF B2", flag: "🇫🇷" }
  ];

  const certifications = [
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024",
      level: "Foundational"
    },
    {
      title: "TCF French Language",
      issuer: "France Éducation International",
      level: "Level B2"
    }
  ];

  return (
    <div className="min-h-screen px-6 py-32" >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-5xl md:text-6xl mb-6 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            About Me
          </h1>
          <div
            className="h-1 w-24 mx-auto rounded-full mb-8"
            style={{
              background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.8), rgba(147, 51, 234, 0.8), rgba(217, 70, 239, 0.8))'
            }}/>
         <div className="max-w-4xl mx-auto space-y-6 text-left">
            <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              Hi, I’m <span className="text-cyan-500 font-semibold">Abd El Madjid Kahoul</span>, an AI & software graduate who enjoys figuring out how systems work—and making them work better.
            </p>

            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              I’m especially interested in the space where ideas turn into real, usable software, and where curiosity leads the way before the code does.
            </p>

            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              I like working at the intersection of{' '}
              <span className={isDark ? 'text-violet-400' : 'text-violet-600'}>artificial intelligence</span>,{' '}
              <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>backend engineering</span>, and{' '}
              <span className={isDark ? 'text-fuchsia-400' : 'text-fuchsia-600'}>real-world problems</span>—building systems that don’t just run, but <strong>adapt and scale</strong>.
            </p>

            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              I enjoy learning by doing, collaborating with others, and constantly improving how things are built, whether through cleaner architecture, smarter data, or better design choices.
            </p>

          <div className={`flex items-center gap-3 pt-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
            <Heart className="w-5 h-5" />
            <p className="text-base italic">
              “Built with curiosity, refined by code.”
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
            <h3 className={`text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Skills & Expertise</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Technical proficiency, soft skills, and what I bring to every project
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
            <h3 className={`text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>My Journey</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Education, work experience, and the path that shaped me from student to AI developer
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
            <h3 className={`text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Achievements</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Certifications, languages, and milestones that define my professional growth
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
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Education</h2>
                </div>
                <div className="space-y-6">
                  {education.map((edu, index) => (
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
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Work Experience</h2>
                </div>
                <div className="space-y-8 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent hidden md:block" />

                  {workExperience.map((job, index) => (
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
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Technical Proficiency</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {technicalSkills.map((category, index) => (
                    <div
                      key={index}
                      className={`p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/50 transition-all ${isDark ? 'bg-black/20' : 'bg-white'}`}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <category.icon className={`w-7 h-7 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
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
                  ))}
                </div>
              </section>

              {/* Soft Skills */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-violet-500" />
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Soft Skills</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {softSkills.map((skill, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border border-violet-500/20 hover:border-violet-500/50 transition-all group ${isDark ? 'bg-black/20' : 'bg-white'}`}
                    >
                      <skill.icon className={`w-8 h-8 mb-3 group-hover:scale-110 transition-transform ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                      <h3 className={`text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{skill.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{skill.description}</p>
                    </div>
                  ))}
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
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Certifications</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
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
                  <h2 className={`text-3xl ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Languages</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {languages.map((lang, index) => (
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
    </div>
  );
}