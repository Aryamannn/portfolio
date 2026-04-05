"use client";

import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import Image from "next/image";
import { motion } from 'framer-motion';

// Animation configurations
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleUp = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2
    }
  }
};

const profileImageAnimation = {
  initial: { 
    scale: 0.5, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

const socialIconAnimation = {
  initial: { 
    scale: 0 
  },
  animate: { 
    scale: 1 
  },
  hover: { 
    scale: 1.2,
    rotate: 12,
    transition: { 
      duration: 0.2 
    }
  }
};

// Motion Components
const MotionHeading = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const MotionCard = ({ children, index = 0 }) => (
  <motion.div
    variants={scaleUp}
    initial="initial"
    whileInView="animate"
    whileHover="hover"
    viewport={{ once: true }}
    custom={index}
  >
    {children}
  </motion.div>
);

const MotionSection = ({ children }) => (
  <motion.div
    variants={staggerContainer}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-100px" }}
  >
    {children}
  </motion.div>
);

// Reusable Components
const Section = ({ id, title, children, bgColor = "bg-gray-900/30" }) => (
  <MotionSection>
    <section id={id} className={`py-8 ${bgColor} backdrop-blur-sm`}>
      <div className="max-w-4xl mx-auto px-4">
        <MotionHeading>
          <h2 className="text-3xl font-bold text-center mb-8 text-white">{title}</h2>
        </MotionHeading>
        {children}
      </div>
    </section>
  </MotionSection>
);

const Card = ({ children, className = "", index = 0 }) => (
  <MotionCard index={index}>
    <div className={`bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all border border-gray-700 hover:border-blue-500/30 ${className}`}>
      {children}
    </div>
  </MotionCard>
);

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const navLinks = [
    { href: "#home", text: "Home" },
    { href: "#education", text: "Education" },
    { href: "#skills", text: "Skills" },
    { href: "#experience", text: "Experience" },
    { href: "#projects", text: "Projects" },
    { href: "#contact", text: "Contact" }
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-md shadow-lg fixed w-full z-10 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center h-16 relative">
          {/* Name on the left */}
          <a href="#home" className="absolute left-0 text-xl font-bold text-white">
            Aryaman Mishra
          </a>
          
          {/* Centered navigation links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-gray-800/50"
              >
                {link.text}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button on the right */}
          <button 
            className="md:hidden absolute right-0 text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Skills Component
const Skills = () => {
  const skillsData = [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C++"]
    },
    {
      category: "AI & Data",
      skills: ["Gemini API", "LLM Integration", "Power BI", "ETL Pipelines", "Data Modeling"]
    },
    {
      category: "Tools & Frameworks",
      skills: ["React", "FastAPI", "Node.js", "PostgreSQL", "Supabase", "Git", "Docker", "AWS"]
    }
  ];

  return (
    <Section id="skills" title="Skills" bgColor="bg-gray-800/20">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        {skillsData.map((category, index) => (
          <Card key={index} index={index}>
            <motion.h3 
              variants={fadeInUp}
              className="text-xl font-semibold mb-4 text-white"
            >
              {category.category}
            </motion.h3>
            <motion.ul 
              variants={staggerContainer}
              className="space-y-2"
            >
              {category.skills.map((skill, skillIndex) => (
                <motion.li
                  key={skillIndex}
                  variants={fadeInUp}
                  className="text-gray-300"
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
};

// Education Component
const Education = () => {
  const educationData = [
    {
      school: "California State University, Monterey Bay",
      degree: "Bachelor of Science in Computer Science",
      date: "Dec. 2024",
      location: "California, USA",
      coursework: "Data Structures, Algorithms, Databases, Computer Systems, Machine Learning"
    },
    {
      school: "Vidyalankar Institute for International Education",
      degree: "B.Tech in Computer Engineering",
      date: "Aug. 2023",
      location: "Mumbai, India"
    }
  ];

  return (
    <Section id="education" title="Education" bgColor="bg-gray-900/30">
      <div className="grid gap-8 max-w-2xl mx-auto">
        {educationData.map((edu, index) => (
          <Card key={index}>
            <h3 className="font-bold text-lg text-white">{edu.school}</h3>
            <p className="text-gray-300 font-medium">{edu.degree}</p>
            <p className="text-gray-400">{edu.date}{edu.location ? ` · ${edu.location}` : ""}</p>
            {edu.coursework && <p className="text-gray-500 text-sm mt-1">Coursework: {edu.coursework}</p>}
          </Card>
        ))}
      </div>
    </Section>
  );
};

// Experience Component
const Experience = () => {
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
        "Consolidated data from ServiceNow, POS, and inventory systems to streamline event planning and financial reporting for marketing and finance teams"
      ]
    },
    {
      title: "Front End Development Intern",
      company: "Morfeed",
      duration: "Feb. 2023 – May 2023",
      location: "Mumbai, India",
      achievements: [
        "Refactored front-end components to fix rendering bugs, improving page load times by 30%",
        "Collaborated with backend team to integrate APIs, reducing data fetch errors and improving user experience"
      ]
    }
  ];

  return (
    <Section id="experience" title="Experience" bgColor="bg-gray-900/30">
      <div className="grid gap-8 max-w-2xl mx-auto">
        {experienceData.map((exp, index) => (
          <Card key={index}>
            <h3 className="font-bold text-lg text-white">{exp.title}</h3>
            <p className="text-gray-300 font-medium">{exp.company}</p>
            <p className="text-gray-400 mb-4">{exp.duration}{exp.location ? ` · ${exp.location}` : ""}</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {exp.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// Projects Component
const Projects = () => {
  const projectsData = [
    {
      title: "DocMiddleware",
      description: "AI-powered document processing platform that extracts invoice data using Gemini API, achieving 100% confidence on 141 documents with 4.9s average latency. Features custom schema builder allowing users to define extraction fields without code, plus human-in-the-loop review workflow with status tracking.",
      tags: ["Supabase", "Gemini API", "React"],
      links: {
        demo: "https://gina-two.vercel.app/dashboard",
        github: "https://github.com/Aryamannn/docmiddleware"
      }
    },
    {
      title: "AI Chatbot Dashboard",
      description: "Multi-tenant AI assistant platform that transforms knowledge bases into customer-facing chatbots with no training required. Features one-click embed system for deployment on any website with a single line of code. Implements zero-trust architecture ensuring user data is never stored or used for model training.",
      tags: ["FastAPI", "Supabase", "Gemini API", "React"],
      links: {
        demo: null,
        github: "https://github.com/Aryamannn/ai-chatbot-dashboard"
      }
    },
    {
      title: "Resume AI Analyzer",
      description: "Dual-mode AI platform helping candidates optimize resumes against job descriptions and recruiters evaluate candidate fit instantly. Integrates PDF parsing with AI analysis to provide actionable feedback on resume-to-JD alignment.",
      tags: ["Python", "Gemini API", "React"],
      links: {
        demo: null,
        github: "https://github.com/Aryamannn/resume-ai-analyzer"
      }
    }
  ];

  return (
    <Section id="projects" title="Projects" bgColor="bg-gray-800/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        {projectsData.map((project, index) => (
          <Card key={index}>
            <h3 className="font-bold text-lg mb-2 text-white">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-white hover:underline transition-colors"
                >
                  Demo
                </a>
              )}
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white hover:underline transition-colors"
              >
                GitHub
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    });
    
    e.currentTarget.reset();
    alert('Message sent! (This is a demo alert)');
  };

  return (
    <div className="min-h-screen text-gray-300 relative">
      <div className="fixed inset-0 bg-black"></div>
      <div className="fixed inset-0 bg-grid opacity-10"></div>
      
      <div className="relative">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <section id="home" className="pt-24 pb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-transparent"></div>
          
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between min-h-[70vh]">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="text-center md:text-left md:flex-1"
              >
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  Hi, I&apos;m <span className="text-white">Aryaman Mishra</span>
                </motion.h1>
                <motion.p 
                  variants={fadeInUp}
                  className="text-xl text-gray-400 mb-8 max-w-2xl"
                >
                  Software Engineer | Full Stack Developer | AI/Data Solutions
                </motion.p>
                
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="flex flex-wrap justify-center md:justify-start gap-6"
                >
                  {[
                    { href: "https://github.com/Aryamannn", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/aryamanmishra/", icon: Linkedin, label: "LinkedIn" },
                    { href: "mailto:aryaman.mmishra@gmail.com", icon: Mail, label: "Email" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      variants={socialIconAnimation}
                      whileHover="hover"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                      {social.label}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Profile Image next to content */}
              <motion.div
                variants={profileImageAnimation}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="mt-8 md:mt-0 md:ml-8 w-64 h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-gray-900/20"
              >
                <Image 
                  src={'/profile.jpg'}
                  alt="Aryaman Mishra"
                  width={256}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Education />
        <Skills />
        <Experience />
        <Projects />
        
        <Section id="contact" title="Contact Me" bgColor="bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, href: "mailto:aryaman.mmishra@gmail.com", text: "aryaman.mmishra@gmail.com" },
                    { icon: Phone, href: "tel:+18317180852", text: "+1 (831) 718 0852" },
                    { icon: Github, href: "https://github.com/Aryamannn", text: "github.com/Aryamannn" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/aryamanmishra/", text: "linkedin.com/in/aryamanmishra" }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <contact.icon className="h-5 w-5 text-blue-400" />
                      <a 
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors">
                        {contact.text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Send Message Card */}
              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: "name", type: "text", label: "Name" },
                    { id: "email", type: "email", label: "Email" }
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        className="w-full px-3 py-2 bg-gray-900/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-300 transition-all"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-300 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 font-medium shadow-lg hover:shadow-blue-500/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="relative bg-gradient-to-b from-gray-900 to-black py-8 border-t border-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex justify-center space-x-6 mb-4">
                {[
                  { href: "https://github.com/Aryamannn", icon: Github },
                  { href: "https://www.linkedin.com/in/aryamanmishra/", icon: Linkedin },
                  { href: "mailto:aryaman.mmishra@gmail.com", icon: Mail }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
              <p className="text-gray-400">© {new Date().getFullYear()} Aryaman Mishra. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
