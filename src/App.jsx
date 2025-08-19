import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Smartphone, Brain, Zap } from 'lucide-react'
import MatrixBackground from './components/MatrixBackground'
import HolographicCard, { SkillCard, ProjectCard } from './components/HolographicCard'
import profileImage from './assets/nidin.jpeg'
import './App.css'

// SEO Component for dynamic meta updates
const SEOHead = () => {
  useEffect(() => {
    // Update page title dynamically
    document.title = "Nidin Sreenivasan - Software Engineer | Portfolio"

    // Add additional meta tags if needed
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Nidin Sreenivasan (NidinSree) - Software Engineer 1 at Tekion Corp. Expert in Go, Java, Redis, Python, Spring Boot. Portfolio showcasing projects and experience.')
    }
  }, [])

  return null
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, isMenuOpen])

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Technical skills - updated with current tech stack
  const skills = [
    { name: 'Go (Golang)', level: 90, icon: <Code size={24} /> },
    { name: 'Java', level: 95, icon: <Code size={24} /> },
    { name: 'Spring Boot', level: 90, icon: <Globe size={24} /> },
    { name: 'Python', level: 85, icon: <Brain size={24} /> },
    { name: 'Redis', level: 85, icon: <Database size={24} /> },
    { name: 'AWS', level: 85, icon: <Zap size={24} /> },
    { name: 'PostgreSQL', level: 80, icon: <Database size={24} /> },
    { name: 'Docker', level: 80, icon: <Smartphone size={24} /> },
  ]

  // Projects based on resume
  const projects = [
    {
      title: 'maya.ai Recommendation Engine',
      description: 'Contributed to development of personalized recommendation engine serving millions of users.',
      tech: ['Java', 'Spring Boot', 'ElasticSearch', 'AWS'],
      link: '#'
    },
    {
      title: 'Offer Portal Optimization',
      description: 'Built and optimized portal that reduced offer onboarding time by 50% for multi-stakeholder teams.',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
      link: '#'
    },
    {
      title: 'Grocery App - Microservices',
      description: 'Developed a microservices architecture grocery application using modern Java technologies.',
      tech: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
      link: '#'
    },
    {
      title: 'Academic Assistant NLP Chatbot',
      description: 'Developed an NLP chatbot to provide academic support and enhance student engagement.',
      tech: ['Python', 'NLP', 'Machine Learning', 'TensorFlow'],
      link: '#'
    },
    {
      title: 'Aspect Mining on Confectionary Products',
      description: 'Conducted sentiment analysis and aspect-based mining to identify consumer preferences.',
      tech: ['Python', 'NLP', 'Sentiment Analysis', 'Data Mining'],
      link: '#'
    }
  ]

  return (
    <div className="app">
      <SEOHead />
      <MatrixBackground />

      {/* Navigation */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <motion.div
            className="nav-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>NIDIN SREENIVASAN</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="hero" role="banner">
          <h1 className="sr-only">Nidin Sreenivasan - Software Engineer Portfolio</h1>
          <div className="hero-container">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                NIDIN SREENIVASAN
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Software Engineer 1
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Building scalable solutions with Go, Java, Redis & Cloud Technologies
              </motion.p>

              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  className="btn btn-primary"
                  onClick={() => scrollToSection('projects')}
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ minHeight: isMobile ? '48px' : 'auto' }}
                >
                  View Projects
                </motion.button>
                <motion.button
                  className="btn btn-secondary"
                  onClick={() => scrollToSection('contact')}
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ minHeight: isMobile ? '48px' : 'auto' }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>

              <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">8.36</span>
                  <span className="stat-label">CGPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Companies</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>About Me</h2>
              <p>Get to know more about who I am and what I do</p>
            </motion.div>

            <div className="about-content">
              <motion.div
                className="about-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p>
                  I'm <strong>Nidin Sreenivasan</strong> (also known as <strong>NidinSree</strong>), a Software Engineer 1 at <strong>Tekion Corp</strong> with expertise in <strong>Go (Golang)</strong>, <strong>Java</strong>, <strong>Redis</strong>, and cloud technologies.
                  Previously worked at <strong>Crayon Data</strong> on the maya.ai recommendation engine serving millions of users with personalized recommendations.
                </p>
                <p>
                  I graduated from <strong>Coimbatore Institute of Technology</strong> with a CGPA of 8.36/10.0 in <strong>Computer Science and Engineering</strong>.
                  My experience spans from building scalable backend systems to optimizing automation processes that reduce processing time by 75%.
                  I specialize in <strong>microservices architecture</strong>, <strong>Spring Boot</strong>, and <strong>cloud-native applications</strong>.
                </p>
                <p>
                  I'm passionate about <strong>data structures and algorithms</strong>, building efficient solutions, and modern software engineering practices.
                  I've led deployment efforts for major banks and have extensive experience in developing scalable backend systems, automation solutions, and high-performance applications.
                  My technical expertise includes <strong>Go programming</strong>, <strong>Java development</strong>, <strong>Redis caching</strong>, <strong>Python automation</strong>, and <strong>AWS cloud services</strong>.
                </p>
                <div className="education-info">
                  <h4>Education</h4>
                  <p><strong>Bachelor of Engineering (Computer Science)</strong></p>
                  <p>Coimbatore Institute of Technology (2019-2023)</p>
                  <p>CGPA: 8.36/10.0</p>
                </div>
              </motion.div>

              <motion.div
                className="about-image"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="profile-image-container">
                  <img
                    src={profileImage}
                    alt="Nidin Sreenivasan - Software Engineer"
                    className="profile-image"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Professional Experience</h2>
              <p>My journey in software development</p>
            </motion.div>

            <div className="experience-timeline">
              <motion.div
                className="experience-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="experience-content">
                  <h3>Software Engineer 1</h3>
                  <h4>Tekion Corp • Chennai, India</h4>
                  <p className="experience-date">May 2024 - Present</p>
                  <ul>
                    <li>Developing scalable backend services using Go (Golang) and microservices architecture</li>
                    <li>Working with Redis for high-performance caching and data storage solutions</li>
                    <li>Building robust APIs and services using Java Spring Boot framework</li>
                    <li>Implementing Python-based automation and data processing solutions</li>
                    <li>Contributing to cloud-native applications and distributed systems</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="experience-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="experience-content">
                  <h3>Associate Software Engineer</h3>
                  <h4>Crayon Data • Chennai, India</h4>
                  <p className="experience-date">Aug 2023 - May 2024</p>
                  <ul>
                    <li>Contributed to development of maya.ai recommendation engine using Java Spring Boot and ElasticSearch</li>
                    <li>Built and optimized Offer Portal, reducing onboarding time by 50%</li>
                    <li>Automated third-party API integration, reducing processing time from 3 hours to 45 minutes</li>
                    <li>Led deployment efforts for two of the largest banks ensuring smooth integration</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="experience-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="experience-content">
                  <h3>SDET Intern</h3>
                  <h4>Quinbay • Coimbatore, India</h4>
                  <p className="experience-date">Jan 2023 - July 2023</p>
                  <ul>
                    <li>Developed automation scripts for daily and end-to-end runs on iOS and Android devices</li>
                    <li>Improved test coverage from 75% to 95% using Selenium, Appium, and Rest Assured</li>
                    <li>Implemented comprehensive testing strategies for mobile applications</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Skills & Technologies</h2>
              <p>Technologies I work with</p>
            </motion.div>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Featured Projects</h2>
              <p>Some of my recent work</p>
            </motion.div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  link={project.link}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Get In Touch</h2>
              <p>Let's work together on your next project</p>
            </motion.div>

            <motion.div
              className="contact-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={24} />
                  <span>nidin2505@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span>📱</span>
                  <span>+91 7538889737</span>
                </div>
                <div className="contact-item">
                  <span>📍</span>
                  <span>Coimbatore, India</span>
                </div>
                <div className="contact-item">
                  <Linkedin size={24} />
                  <span>linkedin.com/in/nidin-sree-a4a079193</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Nidin Sreenivasan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
