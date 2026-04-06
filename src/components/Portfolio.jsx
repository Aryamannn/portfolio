"use client";

import React, { useState, useRef } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ArrowUpRight,
  Code2,
  Database,
  Cpu,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  MapPin,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const educationData = [
  {
    school: "California State University, Monterey Bay",
    degree: "B.S. in Computer Science",
    date: "Dec. 2024",
    location: "California, USA",
    coursework: "Data Structures, Algorithms, Databases, Machine Learning",
  },
  {
    school: "Vidyalankar Institute for International Education",
    degree: "B.Tech in Computer Engineering",
    date: "Aug. 2023",
    location: "Mumbai, India",
  },
];

const experienceData = [
  {
    title: "POS-IT Admin",
    company: "Compass Group",
    duration: "Jan. 2025 – Present",
    location: "California, USA",
    bullets: [
      "Built automated sales reporting pipeline using SQL + Power BI, reducing reporting time by 60%",
      "Designed real-time inventory dashboards identifying cost-saving opportunities across retail locations",
      "Maintained 99%+ POS uptime across multiple campus locations",
      "Consolidated data from ServiceNow, POS & inventory systems for marketing and finance teams",
    ],
  },
  {
    title: "Front End Development Intern",
    company: "Morfeed",
    duration: "Feb. 2023 – May 2023",
    location: "Mumbai, India",
    bullets: [
      "Refactored front-end components to fix rendering bugs, improving page load times by 30%",
      "Integrated APIs with the backend team, reducing data fetch errors and improving UX",
    ],
  },
];

const skillsData = [
  {
    category: "Languages",
    icon: Code2,
    items: [
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
    items: [
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
    items: [
      { name: "React / Next.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "PostgreSQL / Supabase", level: 80 },
      { name: "Git / Docker", level: 88 },
      { name: "AWS", level: 65 },
    ],
  },
];

const techBadges = [
  "Python","JavaScript","TypeScript","SQL","Java","C++",
  "React","Next.js","FastAPI","Node.js","PostgreSQL","Supabase",
  "Gemini API","Power BI","Docker","AWS","Git","Tailwind CSS",
];

const projectsData = [
  {
    num: "01",
    title: "DocMiddleware",
    description:
      "AI-powered document processing platform extracting invoice data using Gemini API — 100% confidence on 141 documents at 4.9s average latency. Custom schema builder + human-in-the-loop review workflow.",
    tags: ["Supabase", "Gemini API", "React"],
    demo: "https://gina-two.vercel.app/dashboard",
    github: "https://github.com/Aryamannn/docmiddleware",
  },
  {
    num: "02",
    title: "AI Chatbot Dashboard",
    description:
      "Multi-tenant AI assistant platform turning knowledge bases into customer-facing chatbots. One-click embed, zero-trust architecture, no training required — deployable anywhere with one line of code.",
    tags: ["FastAPI", "Supabase", "Gemini API", "React"],
    demo: "https://ai-chatbot-beta-six-30.vercel.app/#features",
    github: "https://github.com/Aryamannn/ai-chatbot-dashboard",
  },
  {
    num: "03",
    title: "Resume AI Analyzer",
    description:
      "Dual-mode AI platform for candidates and recruiters. PDF parsing + AI analysis delivers instant, actionable feedback on resume-to-JD alignment.",
    tags: ["Python", "Gemini API", "React"],
    demo: "https://ai-resume-analyzer-omega-lime.vercel.app/",
    github: "https://github.com/Aryamannn/resume-ai-analyzer",
  },
];

// ─────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────

const Blob = ({ className }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} />
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/[0.05] border border-white/[0.08] rounded-2xl backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const LinkButton = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="relative bg-white/[0.07] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-white/[0.11] transition-all group"
  >
    <ArrowUpRight className="absolute top-2 right-2 w-3 h-3 text-white/25 group-hover:text-white/50 transition-colors" />
    <Icon className="w-5 h-5 text-white/80" />
    <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">{label}</span>
  </motion.a>
);

const SkillBar = ({ name, level, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-white/60 text-xs">{name}</span>
        <span className="text-white/30 text-xs">{level}%</span>
      </div>
      <div className="h-[1.5px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.3, ease: "easeOut", delay }}
          className="h-full bg-white/70 rounded-full"
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#skills", text: "Skills" },
  { href: "#experience", text: "Experience" },
  { href: "#projects", text: "Projects" },
  { href: "#contact", text: "Contact" },
];

const Nav = ({ open, setOpen }) => (
  <motion.nav
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
    className="fixed top-0 w-full z-50"
  >
    <div className="bg-black/60 backdrop-blur-2xl border-b border-white/[0.06] px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <a href="#home" className="text-white font-black text-sm tracking-[0.25em] uppercase">
          AM
        </a>
        <div className="hidden md:flex gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] text-white/40 hover:text-white/90 px-4 py-2 rounded-lg hover:bg-white/5 transition-all tracking-[0.12em] uppercase"
            >
              {l.text}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-white/40 hover:text-white p-2 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </div>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.06] px-6 pb-4"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-white/40 hover:text-white uppercase tracking-[0.15em] transition-colors"
            >
              {l.text}
            </a>
          ))}
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
    className="grain relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
  >
    {/* Blobs */}
    <Blob className="w-[750px] h-[380px] bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 opacity-65 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] animate-float" />
    <Blob className="w-[280px] h-[280px] bg-purple-900/70 opacity-60 blur-[80px] top-[20%] left-[15%] animate-float-slow" />
    <Blob className="w-[200px] h-[200px] bg-blue-800/60 opacity-50 blur-[70px] bottom-[25%] right-[20%] animate-float-fast" />

    {/* Main text */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 text-center px-4 select-none"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.3em" }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase mb-8"
      >
        Portfolio · 2025
      </motion.p>

      <h1 className="text-[clamp(3.5rem,11vw,9rem)] font-black text-white uppercase tracking-tighter leading-[0.88]">
        Aryaman
        <br />
        Mishra
        <span className="inline-block w-[0.12em] h-[0.12em] bg-white rounded-full ml-[0.1em] align-top mt-[0.22em]" />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-8 text-white/35 text-xs md:text-sm tracking-[0.2em] uppercase"
      >
        AI / Software Developer &nbsp;·&nbsp; Full Stack &nbsp;·&nbsp; AI / Data
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-12 flex gap-4 justify-center flex-wrap"
      >
        <a
          href="#about"
          className="px-8 py-3 border border-white/15 text-white/70 text-xs uppercase tracking-[0.18em] rounded-full hover:bg-white/5 hover:border-white/30 hover:text-white transition-all"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="px-8 py-3 bg-white text-black text-xs uppercase tracking-[0.18em] rounded-full font-bold hover:bg-white/90 transition-all"
        >
          Let&apos;s Talk
        </a>
      </motion.div>
    </motion.div>

    {/* Bottom corners */}
    <div className="absolute bottom-8 left-8 text-white/20 text-[10px] tracking-[0.2em] uppercase">
      Aryaman Mishra
    </div>
    <div className="absolute bottom-8 right-8 text-white/20 text-[10px] tracking-[0.15em]">
      © 2025
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 7, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/15"
    >
      <ChevronDown className="w-5 h-5" />
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────

const About = () => (
  <section id="about" className="relative flex flex-col md:flex-row min-h-screen bg-black overflow-hidden">
    {/* LEFT PANEL — indigo glow */}
    <div
      className="grain relative md:w-[38%] min-h-[55vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #18109a 0%, #0c0870 35%, #050330 65%, #000000 100%)",
      }}
    >
      <Blob className="w-60 h-60 bg-purple-700/50 blur-[90px] top-1/4 left-1/2 -translate-x-1/2 animate-float-slow" />

      <div className="relative z-10 text-center px-8 py-20">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">Hello, I am</p>

        {/* Profile photo */}
        <div className="w-48 h-56 md:w-56 md:h-64 mx-auto mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="/profile.jpg"
            alt="Aryaman Mishra"
            width={224}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
          Aryaman
          <br />
          Mishra
        </h2>
        <p className="text-white/35 text-xs mt-4 tracking-[0.2em] uppercase">
          AI / Software Developer
        </p>
      </div>
    </div>

    {/* RIGHT PANEL — dark content */}
    <div className="flex-1 bg-[#050505] flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20">
      {/* About Me */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-5">About Me</h3>
        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
          Passionate software engineer focused on AI-powered tools and full-stack development.
          I thrive at the intersection of data and engineering &mdash; building intelligent systems
          that turn complex data into clean, impactful user experiences. Currently working at
          Compass Group building real-time reporting infrastructure and data pipelines.
        </p>
      </motion.div>

      {/* Education + Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg font-bold text-white mb-5 pb-3 border-b border-white/[0.07]">
            Education
          </h4>
          <div className="space-y-5">
            {educationData.map((e, i) => (
              <div key={i}>
                <p className="text-white/30 text-[10px] tracking-[0.18em] uppercase mb-1">
                  {e.date}
                </p>
                <p className="text-white/80 text-sm font-semibold leading-snug">{e.school}</p>
                <p className="text-white/35 text-xs mt-0.5">{e.degree}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-lg font-bold text-white mb-5 pb-3 border-b border-white/[0.07]">
            Work Experience
          </h4>
          <div className="space-y-5">
            {experienceData.map((e, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-white/20 text-lg leading-none mt-0.5">·</span>
                <div>
                  <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-1">
                    {e.duration}
                  </p>
                  <p className="text-white/80 text-sm font-semibold">{e.company}</p>
                  <p className="text-white/35 text-xs">{e.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Social buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        <LinkButton
          href="https://www.linkedin.com/in/aryamanmishra/"
          icon={Linkedin}
          label="LinkedIn"
        />
        <LinkButton href="mailto:aryaman.mmishra@gmail.com" icon={Mail} label="Email" />
        <LinkButton href="https://github.com/Aryamannn" icon={Github} label="GitHub" />
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────

const Skills = () => (
  <section id="skills" className="grain relative py-28 bg-black overflow-hidden">
    <Blob className="w-[500px] h-[500px] bg-indigo-900/30 blur-[130px] top-0 right-0 animate-float-slow" />

    <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-3">What I work with</p>
        <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
          Skills
        </h2>
      </motion.div>

      {/* Skill cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {skillsData.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/[0.07] border border-white/[0.06]">
                  <cat.icon className="w-4 h-4 text-white/60" />
                </div>
                <h3 className="text-white font-bold text-sm uppercase tracking-[0.12em]">
                  {cat.category}
                </h3>
              </div>
              {cat.items.map((s, j) => (
                <SkillBar key={j} name={s.name} level={s.level} delay={j * 0.08} />
              ))}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Tech badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap gap-2.5"
      >
        {techBadges.map((tech, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.035 }}
            whileHover={{ scale: 1.06, y: -1 }}
            className="px-4 py-2 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-white/50 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.07] transition-all cursor-default"
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
  <section id="experience" className="relative py-28 bg-[#030303] overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-3">Career</p>
        <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
          Experience
        </h2>
      </motion.div>

      <div className="space-y-5">
        {experienceData.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <GlassCard className="p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">{exp.company}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                  <span className="text-white/30 text-[11px] tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> {exp.duration}
                  </span>
                  <span className="text-white/20 text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/45 text-sm leading-relaxed">
                    <span className="flex-shrink-0 mt-2 w-1 h-1 bg-white/30 rounded-full" />
                    {b}
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

// ─────────────────────────────────────────────
// PROJECTS
// ──────────────────────────���──────────────────

const Projects = () => (
  <section id="projects" className="grain relative py-28 bg-black overflow-hidden">
    <Blob className="w-[400px] h-[400px] bg-purple-900/35 blur-[110px] top-0 right-0 animate-float" />
    <Blob className="w-[300px] h-[300px] bg-blue-900/30 blur-[100px] bottom-0 left-0 animate-float-slow" />

    <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
      {/* Two-column header like the template */}
      <div className="flex flex-col md:flex-row md:items-end gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/3"
        >
          <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            Projects
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/35 text-sm max-w-xs leading-relaxed"
        >
          AI-powered tools and full-stack applications built to solve real problems.
        </motion.p>
      </div>

      {/* Project cards — numbered like the template */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projectsData.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <GlassCard className="p-6 flex flex-col h-full hover:border-white/15 transition-all">
              {/* Number */}
              <p className="text-white/15 text-4xl font-black tracking-tight mb-4">
                {project.num}
              </p>

              <h3 className="text-white font-black text-lg uppercase tracking-tight mb-3">
                {project.title}
              </h3>

              <p className="text-white/40 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.08] rounded-full text-[10px] text-white/40 uppercase tracking-[0.1em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-white/[0.07]">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover:text-white" />
                    Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors group"
                >
                  <Github className="w-3.5 h-3.5 group-hover:text-white" />
                  GitHub
                </a>
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
    <section id="contact" className="grain relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-28">
      {/* Blobs */}
      <Blob className="w-[650px] h-[350px] bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-800 opacity-60 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] animate-float" />
      <Blob className="w-[250px] h-[250px] bg-purple-900/50 blur-[80px] top-1/4 left-1/4 animate-float-slow" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Big heading like "THANK YOU" slide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-white uppercase tracking-tighter leading-none mb-6">
            Let&apos;s
            <br />
            Connect
          </h2>

          {/* Pill-highlighted subtext like the template */}
          <p className="text-white/50 text-sm md:text-base mb-4">
            Ready to build{" "}
            <span className="inline-flex items-center border border-indigo-400/50 text-indigo-300 italic px-4 py-1 rounded-full text-sm mx-1">
              something great
            </span>{" "}
            together
          </p>
          <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-14">
            aryaman.mmishra@gmail.com &nbsp;·&nbsp; +1 (831) 718 0852
          </p>
        </motion.div>

        {/* Social buttons row — the template's signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-16"
        >
          <LinkButton
            href="https://www.linkedin.com/in/aryamanmishra/"
            icon={Linkedin}
            label="LinkedIn"
          />
          <LinkButton href="mailto:aryaman.mmishra@gmail.com" icon={Mail} label="Email" />
          <LinkButton href="https://github.com/Aryamannn" icon={Github} label="GitHub" />
          <LinkButton href="tel:+18317180852" icon={Phone} label="Phone" />
        </motion.div>

        {/* Simple contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <GlassCard className="p-8 text-left max-w-lg mx-auto">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", type: "text", label: "Name" },
                { id: "email", type: "email", label: "Email" },
              ].map((f) => (
                <div key={f.id}>
                  <label className="block text-white/30 text-[10px] uppercase tracking-[0.15em] mb-2">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.id}
                    required
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white/70 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all placeholder-white/20"
                  />
                </div>
              ))}
              <div>
                <label className="block text-white/30 text-[10px] uppercase tracking-[0.15em] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white/70 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all resize-none placeholder-white/20"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                Send Message
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-black border-t border-white/[0.05] py-6">
    <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
        Aryaman Mishra
      </p>
      <div className="flex gap-5">
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
            whileHover={{ scale: 1.15 }}
            className="text-white/20 hover:text-white/60 transition-colors"
          >
            <s.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </div>
      <p className="text-white/15 text-[10px] tracking-wider">© 2025</p>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav open={menuOpen} setOpen={setMenuOpen} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
