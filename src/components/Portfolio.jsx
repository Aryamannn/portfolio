"use client";

import React, { useState, useRef } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Code2,
  Database,
  Cpu,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const educationData = [
  {
    school: "California State University, Monterey Bay",
    degree: "Bachelor of Science in Computer Science",
    date: "Dec. 2024",
    location: "California, USA",
    coursework:
      "Data Structures, Algorithms, Databases, Computer Systems, Machine Learning",
  },
  {
    school: "Vidyalankar Institute for International Education",
    degree: "B.Tech in Computer Engineering",
    date: "Aug. 2023",
    location: "Mumbai, India",
  },
];

const skillsData = [
  {
    category: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 70 },
      { name: "C++", level: 65 },
    ],
  },
  {
    category: "AI & Data",
    icon: Cpu,
    skills: [
      { name: "Gemini API", level: 90 },
      { name: "LLM Integration", level: 85 },
      { name: "Power BI", level: 80 },
      { name: "ETL Pipelines", level: 75 },
      { name: "Data Modeling", level: 75 },
    ],
  },
  {
    category: "Tools & Frameworks",
    icon: Database,
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "PostgreSQL / Supabase", level: 80 },
      { name: "Git / Docker", level: 88 },
      { name: "AWS", level: 65 },
    ],
  },
];

const techBadges = [
  "Python", "JavaScript", "TypeScript", "SQL", "Java", "C++",
  "React", "Next.js", "FastAPI", "Node.js", "PostgreSQL", "Supabase",
  "Gemini API", "Power BI", "Docker", "AWS", "Git", "Tailwind CSS",
];

const experienceData = [
  {
    title: "POS-IT Admin",
    company: "Compass Group",
    duration: "Jan. 2025 – Present",
    location: "California, USA",
    achievements: [
      "Built automated sales reporting pipeline using SQL and Power BI, replacing manual Excel workflows and reducing reporting time by 60%",
      "Designed real-time inventory dashboards that identified cost-saving opportunities across retail locations",
      "Troubleshot and resolved POS system issues across multiple campus locations, maintaining 99%+ uptime during peak service hours",
      "Consolidated data from ServiceNow, POS, and inventory systems to streamline event planning and financial reporting",
    ],
  },
  {
    title: "Front End Development Intern",
    company: "Morfeed",
    duration: "Feb. 2023 – May 2023",
    location: "Mumbai, India",
    achievements: [
      "Refactored front-end components to fix rendering bugs, improving page load times by 30%",
      "Collaborated with backend team to integrate APIs, reducing data fetch errors and improving user experience",
    ],
  },
];

const projectsData = [
  {
    title: "DocMiddleware",
    description:
      "AI-powered document processing platform that extracts invoice data using Gemini API, achieving 100% confidence on 141 documents with 4.9s average latency. Features custom schema builder and human-in-the-loop review workflow with status tracking.",
    tags: ["Supabase", "Gemini API", "React"],
    links: {
      demo: "https://gina-two.vercel.app/dashboard",
      github: "https://github.com/Aryamannn/docmiddleware",
    },
  },
  {
    title: "AI Chatbot Dashboard",
    description:
      "Multi-tenant AI assistant platform transforming knowledge bases into customer-facing chatbots with no training required. One-click embed system and zero-trust architecture ensuring user data is never stored or used for model training.",
    tags: ["FastAPI", "Supabase", "Gemini API", "React"],
    links: {
      demo: "https://ai-chatbot-beta-six-30.vercel.app/#features",
      github: "https://github.com/Aryamannn/ai-chatbot-dashboard",
    },
  },
  {
    title: "Resume AI Analyzer",
    description:
      "Dual-mode AI platform helping candidates optimize resumes against job descriptions and recruiters evaluate candidate fit instantly. Integrates PDF parsing with AI analysis for actionable feedback on resume-to-JD alignment.",
    tags: ["Python", "Gemini API", "React"],
    links: {
      demo: "https://ai-resume-analyzer-omega-lime.vercel.app/",
      github: "https://github.com/Aryamannn/resume-ai-analyzer",
    },
  },
];

// ─────────────────────────────────────────────
// REUSABLE PRIMITIVES
// ─────────────────────────────────────────────

const GradientText = ({ children, className = "" }) => (
  <span
    className={`bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/30 hover:bg-white/[0.07] transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const SectionHeading = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <GradientText>{title}</GradientText>
    </h2>
    {subtitle && (
      <p className="text-gray-400 max-w-xl mx-auto mt-3 text-sm md:text-base">
        {subtitle}
      </p>
    )}
    <div className="mt-5 h-1 w-20 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
  </motion.div>
);

const SkillBar = ({ name, level, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-orange-400 font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay }}
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          style={{ boxShadow: "0 0 8px rgba(234, 88, 12, 0.5)" }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#education", text: "Education" },
  { href: "#skills", text: "Skills" },
  { href: "#experience", text: "Experience" },
  { href: "#projects", text: "Projects" },
  { href: "#contact", text: "Contact" },
];

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed w-full z-50 top-0"
  >
    <div className="bg-[#030014]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-xl font-bold">
            <GradientText>Aryaman Mishra</GradientText>
          </a>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium"
              >
                {link.text}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#030014]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
              >
                {link.text}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.nav>
);

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

const Hero = () => (
  <section
    id="home"
    className="min-h-screen flex items-center pt-16 relative overflow-hidden"
  >
    {/* Background blobs */}
    <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
    <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-red-600/10 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
    <div className="absolute top-2/3 left-1/2 w-40 h-40 bg-amber-600/8 rounded-full blur-3xl animate-float-slow pointer-events-none" />

    <div className="max-w-6xl mx-auto px-4 md:px-8 w-full py-20">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-orange-400 font-medium mb-3 tracking-widest text-sm uppercase"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-5 leading-tight"
          >
            Hi, I&apos;m
            <br />
            <GradientText>Aryaman Mishra</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-400 mb-8 max-w-lg"
          >
            Software Engineer &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp;
            AI/Data Solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-10"
          >
            <a
              href="#projects"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-orange-500/25"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-xl border border-white/10 text-gray-300 font-semibold hover:border-orange-500/50 hover:text-white hover:bg-white/5 transition-all"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex gap-4 justify-center md:justify-start"
          >
            {[
              { href: "https://github.com/Aryamannn", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/aryamanmishra/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:aryaman.mmishra@gmail.com", icon: Mail, label: "Email" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all">
                  <s.icon className="w-4 h-4" />
                </div>
                <span className="text-sm hidden sm:block">{s.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-60 h-72 md:w-80 md:h-96">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/40 to-red-600/40 blur-2xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-orange-500/30">
              <Image
                src="/profile.jpg"
                alt="Aryaman Mishra"
                width={320}
                height={384}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/50 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-1 text-gray-600 mt-16"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────

const Education = () => (
  <section id="education" className="py-24 relative">
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <SectionHeading
        title="Education"
        subtitle="My academic journey across two continents"
      />
      <div className="grid gap-6 max-w-3xl mx-auto">
        {educationData.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <GlassCard className="p-6 border-l-2 border-l-orange-500/60">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {edu.school}
                    </h3>
                  </div>
                  <p className="text-orange-300 font-medium ml-6">{edu.degree}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 ml-6 sm:ml-0 flex-shrink-0">
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.date}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>
              </div>
              {edu.coursework && (
                <p className="text-gray-500 text-sm ml-6 border-t border-white/5 pt-3 mt-2">
                  <span className="text-gray-400">Coursework: </span>
                  {edu.coursework}
                </p>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────

const Skills = () => (
  <section id="skills" className="py-24 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent pointer-events-none" />
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {skillsData.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/20">
                  <cat.icon className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-white font-bold text-lg">{cat.category}</h3>
              </div>
              {cat.skills.map((skill, j) => (
                <SkillBar
                  key={j}
                  name={skill.name}
                  level={skill.level}
                  delay={j * 0.1}
                />
              ))}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Tech badge grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {techBadges.map((tech, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-orange-500/40 hover:text-white hover:bg-orange-500/10 transition-all cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────

const Experience = () => (
  <section id="experience" className="py-24">
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <SectionHeading title="Experience" subtitle="Where I've made an impact" />
      <div className="space-y-6">
        {experienceData.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <GlassCard className="p-6 border-l-2 border-l-red-500/60">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-red-300 font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 ml-6 sm:ml-0 flex-shrink-0">
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>
              </div>
              <ul className="space-y-2.5 ml-6">
                {exp.achievements.map((a, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-start gap-2.5">
                    <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                    {a}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ────────────────────────────────────────��────
// PROJECTS
// ─────────────────────────────────────────────

const Projects = () => (
  <section id="projects" className="py-24 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeading title="Projects" subtitle="Things I've built" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <GlassCard className="p-0 overflow-hidden h-full flex flex-col">
              {/* Gradient top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-red-500" />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-bold text-xl mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors group"
                  >
                    <Github className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    GitHub
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    alert("Message sent!");
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Contact Me"
          subtitle="Let's build something great together"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-8">Get In Touch</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    text: "aryaman.mmishra@gmail.com",
                    href: "mailto:aryaman.mmishra@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    text: "+1 (831) 718 0852",
                    href: "tel:+18317180852",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    text: "github.com/Aryamannn",
                    href: "https://github.com/Aryamannn",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    text: "linkedin.com/in/aryamanmishra",
                    href: "https://www.linkedin.com/in/aryamanmishra/",
                  },
                ].map((c, i) => (
                  <motion.a
                    key={i}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 transition-all">
                      <c.icon className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{c.label}</p>
                      <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        {c.text}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-8">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", type: "text", label: "Name" },
                  { id: "email", type: "email", label: "Email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.id}
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all resize-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-orange-500/20"
                >
                  Send Message
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-white/5 py-8">
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          {[
            { href: "https://github.com/Aryamannn", icon: Github },
            { href: "https://www.linkedin.com/in/aryamanmishra/", icon: Linkedin },
            { href: "mailto:aryaman.mmishra@gmail.com", icon: Mail },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="p-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <s.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()}{" "}
          <GradientText>Aryaman Mishra</GradientText>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030014] text-gray-300">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
