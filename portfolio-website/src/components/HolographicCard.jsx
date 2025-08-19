import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HolographicCard({ children, className = '', delay = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={`holographic-card ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div 
        className="card-content"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.1))`
            : 'rgba(255, 255, 255, 0.05)',
        }}
      >
        {children}
        <div className="holographic-overlay" />
        <div className="scan-line" />
      </div>
    </motion.div>
  )
}

export function SkillCard({ skill, level, icon, delay = 0 }) {
  return (
    <HolographicCard delay={delay} className="skill-card">
      <div className="skill-icon">
        {icon}
      </div>
      <h3 className="skill-name">{skill}</h3>
      <div className="skill-level">
        <div className="level-bar">
          <motion.div 
            className="level-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1.5, delay: delay + 0.5 }}
            viewport={{ once: true }}
          />
        </div>
        <span className="level-text">{level}%</span>
      </div>
    </HolographicCard>
  )
}

export function ProjectCard({ title, description, tech, image, link, delay = 0 }) {
  return (
    <HolographicCard delay={delay} className="project-card">
      <div className="project-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="image-placeholder">
            <span>Project Preview</span>
          </div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tech">
          {tech.map((technology, index) => (
            <span key={index} className="tech-tag">{technology}</span>
          ))}
        </div>
      </div>
    </HolographicCard>
  )
}
