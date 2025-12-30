import { motion } from 'motion/react';
import { GraduationCap, Award, Globe, Code2, Database, Cloud, Layers } from 'lucide-react';

interface AboutPageProps {
  isDark: boolean;
}

export function AboutPage({ isDark }: AboutPageProps) {
  const education = [
    {
      degree: "Master's in Software Engineering & Intelligent Systems",
      period: "2023 – 2025",
      description: "Advanced studies in AI, system architecture, and intelligent systems design",
    },
    {
      degree: "Bachelor's in Software Engineering",
      period: "2020 – 2023",
      description: "Foundation in software development, algorithms, and system design",
    },
  ];

  const mindset = [
    {
      title: "Telecom-Scale Systems",
      description: "Experience with enterprise-level telecommunications infrastructure at Ooredoo",
    },
    {
      title: "Academic Research & Applied AI",
      description: "Combining theoretical knowledge with practical AI implementations",
    },
    {
      title: "Full-Stack Development",
      description: "End-to-end system development from backend architecture to user interfaces",
    },
  ];

  const skillCategories = [
    {
      icon: Code2,
      title: "Core Technologies",
      skills: ["Python", "Java", "JavaScript", "SQL"],
    },
    {
      icon: Layers,
      title: "Frameworks & Libraries",
      skills: ["Django", "Flask", "React"],
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["MySQL", "PostgreSQL", "Oracle", "Firebase"],
    },
    {
      icon: Cloud,
      title: "AI & Data Science",
      skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "OpenCV"],
    },
  ];

  const languages = [
    { name: "English", level: "Professional" },
    { name: "French", level: "TCF B2" },
    { name: "Arabic", level: "Native" },
  ];

  return (
    <div className="min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`text-5xl md:text-6xl mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            About Me
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
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-slate-700'
            }`}
          >
            I believe in building systems that don't just work, but think. Combining architectural 
            rigor with intelligent automation, I focus on solutions that scale, adapt, and evolve. 
            Every line of code is a step toward more efficient, more intelligent systems.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={32} className={isDark ? 'text-cyan-300' : 'text-cyan-600'} />
            <h2 className={`text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className={`text-2xl mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                  {edu.degree}
                </h3>
                <div className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {edu.period}
                </div>
                <p className={isDark ? 'text-gray-300' : 'text-slate-700'}>
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Mindset */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={`text-3xl mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Professional Mindset
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {mindset.map((item, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-3xl p-6 shadow-2xl"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className={`text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-slate-700'}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Proficiency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className={`text-3xl mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Technical Proficiency
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                style={{
                  background: isDark
                    ? 'rgba(10, 14, 39, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${
                    isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
                  }`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon size={28} className={isDark ? 'text-cyan-300' : 'text-cyan-600'} />
                  <h3 className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl text-sm"
                      style={{
                        background: isDark
                          ? 'rgba(6, 182, 212, 0.2)'
                          : 'rgba(6, 182, 212, 0.3)',
                        color: isDark ? '#67e8f9' : '#0e7490',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages & Certifications */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Languages */}
          <motion.div
            className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
            style={{
              background: isDark
                ? 'rgba(10, 14, 39, 0.6)'
                : 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${
                isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
              }`,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe size={28} className={isDark ? 'text-cyan-300' : 'text-cyan-600'} />
              <h3 className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Languages
              </h3>
            </div>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex justify-between items-center p-3 rounded-xl"
                  style={{
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(3, 105, 161, 0.1)',
                  }}
                >
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>
                    {lang.name}
                  </span>
                  <span className={isDark ? 'text-cyan-300' : 'text-cyan-600'}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
            style={{
              background: isDark
                ? 'rgba(10, 14, 39, 0.6)'
                : 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${
                isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
              }`,
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Award size={28} className={isDark ? 'text-cyan-300' : 'text-cyan-600'} />
              <h3 className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Certifications
              </h3>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                background: isDark
                  ? 'rgba(6, 182, 212, 0.2)'
                  : 'rgba(6, 182, 212, 0.3)',
              }}
            >
              <div className={`text-lg mb-1 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                AWS Cloud Practitioner
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Foundational
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cloud & DevOps */}
        <motion.div
          className="backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          style={{
            background: isDark
              ? 'rgba(10, 14, 39, 0.6)'
              : 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${
              isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
            }`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Cloud size={28} className={isDark ? 'text-cyan-300' : 'text-cyan-600'} />
            <h3 className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Cloud & DevOps
            </h3>
          </div>
          <span
            className="inline-block px-6 py-3 rounded-xl text-lg"
            style={{
              background: isDark
                ? 'rgba(6, 182, 212, 0.2)'
                : 'rgba(6, 182, 212, 0.3)',
              color: isDark ? '#67e8f9' : '#0e7490',
            }}
          >
            AWS Cloud Practitioner
          </span>
        </motion.div>
      </div>
    </div>
  );
}
