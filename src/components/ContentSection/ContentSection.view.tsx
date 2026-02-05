// ContentSection View - Spacecraft Terminal / HUD style interface

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTabNavigation } from './ContentSection.controller';
import { useSystemStatus } from '../../hooks/useSystemStatus';
import {
  sections,
  aboutContent,
  Section,
  SectionContent,
  TextContent,
  ExperienceContent,
  FreelancingContent,
  ProjectsContent,
  ContactContent,
} from '../../data/sections';
import './ContentSection.css';

// Custom Scroll Indicator Component
interface CustomScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const CustomScrollIndicator: React.FC<CustomScrollIndicatorProps> = ({ containerRef }) => {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  const updateScrollIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollHeight, clientHeight, scrollTop } = container;
    const canScroll = scrollHeight > clientHeight;
    setIsScrollable(canScroll);

    if (canScroll) {
      // Calculate thumb height as proportion of visible content
      const thumbHeightPercent = (clientHeight / scrollHeight) * 100;
      setThumbHeight(Math.max(thumbHeightPercent, 10)); // Minimum 10% height

      // Calculate thumb position
      const scrollPercent = scrollTop / (scrollHeight - clientHeight);
      const maxThumbTop = 100 - thumbHeightPercent;
      setThumbTop(scrollPercent * maxThumbTop);
    }
  }, [containerRef]);

  // Handle click on track to jump to position
  const handleTrackClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const trackRect = track.getBoundingClientRect();
    const clickPercent = (e.clientY - trackRect.top) / trackRect.height;
    const scrollTarget = clickPercent * (container.scrollHeight - container.clientHeight);
    container.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  // Handle drag start on thumb
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScrollTop.current = containerRef.current?.scrollTop || 0;
  };

  // Handle drag move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const trackHeight = track.clientHeight;
      const deltaY = e.clientY - dragStartY.current;
      const scrollableHeight = container.scrollHeight - container.clientHeight;
      const scrollDelta = (deltaY / trackHeight) * scrollableHeight;
      
      container.scrollTop = dragStartScrollTop.current + scrollDelta;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, containerRef]);

  // Update on scroll and resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollIndicator();
    container.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);

    // Also update when content might change
    const observer = new MutationObserver(updateScrollIndicator);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      container.removeEventListener('scroll', updateScrollIndicator);
      window.removeEventListener('resize', updateScrollIndicator);
      observer.disconnect();
    };
  }, [containerRef, updateScrollIndicator]);

  return (
    <div 
      ref={trackRef}
      className={`custom-scroll-track ${!isScrollable ? 'hidden' : ''}`}
      onClick={handleTrackClick}
    >
      <div
        className="custom-scroll-thumb"
        style={{
          height: `${thumbHeight}%`,
          top: `${thumbTop}%`,
        }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
};

// Content renderer for different section types
const SectionContentRenderer: React.FC<{ content: SectionContent }> = ({ content }) => {
  switch (content.type) {
    case 'text':
      return <TextContentView content={content} />;
    case 'experience':
      return <ExperienceContentView content={content} />;
    case 'freelancing':
      return <FreelancingContentView content={content} />;
    case 'projects':
      return <ProjectsContentView content={content} />;
    case 'contact':
      return <ContactContentView content={content} />;
    default:
      return null;
  }
};

const TextContentView: React.FC<{ content: TextContent }> = ({ content }) => (
  <div className="content-text">
    {content.paragraphs.map((paragraph, index) => (
      <p key={index} className="content-paragraph">
        {paragraph}
      </p>
    ))}
  </div>
);

const ExperienceContentView: React.FC<{ content: ExperienceContent }> = ({ content }) => (
  <div className="content-experience">
    {content.items.map((item, index) => (
      <div key={index} className="experience-item">
        <div className="experience-header">
          <span className="experience-role">{item.role}</span>
          <span className="experience-period">{item.period}</span>
        </div>
        <span className="experience-company">{item.company}</span>
        <ul className="experience-description">
          {item.description.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
        {item.skills && item.skills.length > 0 && (
          <div className="skills">
            {item.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const FreelancingContentView: React.FC<{ content: FreelancingContent }> = ({ content }) => (
  <div className="content-freelancing">
    {content.items.map((item, index) => (
      <div key={index} className="freelancing-item">
        <div className="freelancing-header">
          <span className="freelancing-project">{item.project}</span>
          <span className="freelancing-period">{item.period}</span>
        </div>
        <span className="freelancing-client">{item.client}</span>
        <ul className="freelancing-description">
          {item.description.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
        {item.skills && item.skills.length > 0 && (
          <div className="skills">
            {item.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const ProjectsContentView: React.FC<{ content: ProjectsContent }> = ({ content }) => (
  <div className="content-projects">
    {content.items.map((item, index) => (
      <div key={index} className="project-item">
        <div className="project-header">
          <span className="project-name">{item.name}</span>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              [LINK]
            </a>
          )}
        </div>
        <p className="project-description">{item.description}</p>
        <div className="project-tech">
          {item.tech.map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ContactIcon: React.FC<{ icon?: string }> = ({ icon }) => {
  switch (icon) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="contact-link-icon">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="contact-link-icon">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="contact-link-icon">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
        </svg>
      );
    default:
      return <span className="contact-link-icon-text">[LINK]</span>;
  }
};

const ContactContentView: React.FC<{ content: ContactContent }> = ({ content }) => (
  <div className="content-contact">
    <div className="contact-messages">
      {content.message.map((paragraph, index) => (
        <p key={index} className="contact-message">{paragraph}</p>
      ))}
    </div>
    <div className="contact-links">
      {content.links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="contact-link"
          style={{ '--card-index': index } as React.CSSProperties}
        >
          <ContactIcon icon={link.icon} />
          <span className="contact-link-label">{link.label}</span>
        </a>
      ))}
    </div>
  </div>
);

// Mobile content renderer (simplified for smaller screens)
const MobileContentRenderer: React.FC<{ content: SectionContent }> = ({ content }) => {
  switch (content.type) {
    case 'text':
      return (
        <div className="mobile-content-text">
          {content.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );
    case 'experience':
      return (
        <div className="mobile-content-experience">
          {content.items.map((item, i) => (
            <div key={i} className="mobile-experience-item">
              <div className="mobile-experience-role">{item.role}</div>
              <div className="mobile-experience-company">
                {item.company} • {item.period}
              </div>
            </div>
          ))}
        </div>
      );
    case 'freelancing':
      return (
        <div className="mobile-content-freelancing">
          {content.items.map((item, i) => (
            <div key={i} className="mobile-freelancing-item">
              <div className="mobile-freelancing-project">{item.project}</div>
              <div className="mobile-freelancing-client">
                {item.client} • {item.period}
              </div>
            </div>
          ))}
        </div>
      );
    case 'projects':
      return (
        <div className="mobile-content-projects">
          {content.items.map((item, i) => (
            <div key={i} className="mobile-project-item">
              <div className="mobile-project-name">{item.name}</div>
              <div className="mobile-project-tech">{item.tech.join(' • ')}</div>
            </div>
          ))}
        </div>
      );
    case 'contact':
      return (
        <div className="mobile-content-contact">
          {content.message.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <div className="mobile-contact-links">
            {content.links.map((link, i) => (
              <a key={i} href={link.href} className="mobile-contact-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

const ContentSection: React.FC = () => {
  const {
    activeTab,
    navigationType,
    sidebarVisible,
    sidebarExiting,
    sidebarEntering,
    contentKey,
    clickedCardId,
    selectTab,
    goHome,
    isTabActive,
  } = useTabNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const systemStatus = useSystemStatus();
  const sectionBodyRef = useRef<HTMLDivElement>(null);

  const activeSection = sections.find((s) => s.id === activeTab);

  // Update time every second for the HUD display
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().slice(11, 19);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  return (
    <section className="content-section">
      {/* Desktop Layout */}
      <div className="content-desktop">
        {/* Main terminal display */}
        <div className="terminal-display">
          {/* HUD Corner Brackets */}
          <div className="hud-bracket hud-bracket-tl" />
          <div className="hud-bracket hud-bracket-tr" />
          <div className="hud-bracket hud-bracket-bl" />
          <div className="hud-bracket hud-bracket-br" />

          {/* Top HUD Bar */}
          <div className="hud-bar hud-bar-top">
            {systemStatus.memory !== null && (
              <div className="hud-data-group">
                <span className="hud-label">MEM</span>
                <span className="hud-value hud-value-mono">{systemStatus.memory}MB</span>
              </div>
            )}
            <div className="hud-data-group">
              <span className="hud-label">UTC</span>
              <span className="hud-value hud-value-mono">{formatTime(currentTime)}</span>
            </div>
            <div className="hud-data-group">
              <span className="hud-label">DATE</span>
              <span className="hud-value hud-value-mono">{formatDate(currentTime)}</span>
            </div>
          </div>

          {/* Scan line overlay */}
          <div className="scan-lines" />

          {/* Main content area */}
          <div className="terminal-content">
            {activeSection ? (
              <div
                key={contentKey}
                className={`section-display ${navigationType === 'module-to-module' ? 'animate-content-swap' : ''} ${navigationType === 'home-to-module' ? 'animate-content-enter' : ''}`}
              >
                <div className="section-header-display">
                  <span className="section-marker">&gt;&gt;</span>
                  <h2 className="section-title">{activeSection.title}</h2>
                </div>
                <div className="section-body-wrapper">
                  <div className="section-body" ref={sectionBodyRef}>
                    <SectionContentRenderer content={activeSection.content} />
                  </div>
                  <CustomScrollIndicator containerRef={sectionBodyRef} />
                </div>
                <div className="section-meta">
                  <span>MODULE: {activeSection.id.toString().padStart(3, '0')}</span>
                </div>
              </div>
            ) : (
              <div className="standby-display">
                <div className="standby-about">
                  <div className="standby-portrait">
                    <img
                      src={aboutContent.portraitUrl}
                      alt="Brandon Sabino"
                      className="portrait-image"
                    />
                    <div className="portrait-frame" />
                  </div>
                  <p className="standby-blurb">{aboutContent.blurb}</p>
                </div>

                {/* Module Grid */}
                <div className="module-grid">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      className={`module-card ${clickedCardId === section.id ? 'clicked' : ''}`}
                      onClick={() => selectTab(section.id)}
                      style={{ '--card-index': index } as React.CSSProperties}
                    >
                      <span className="module-card-title">{section.title}</span>
                      <span className="module-card-summary">{section.summary}</span>
                      <span className="module-card-arrow">&gt;</span>
                    </button>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* Bottom HUD Bar */}
          <div className="hud-bar hud-bar-bottom">
            <div className="hud-data-group">
              <span className="hud-label">LAT</span>
              <span className="hud-value hud-value-mono">40.7128° N</span>
            </div>
            <div className="hud-data-group">
              <span className="hud-label">LON</span>
              <span className="hud-value hud-value-mono">74.0060° W</span>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation - Always in DOM, width-animated */}
        <aside className={`sidebar-nav ${sidebarVisible ? 'sidebar-visible' : ''} ${sidebarEntering ? 'animate-slide-in' : ''} ${sidebarExiting ? 'animate-slide-out' : ''}`}>
          <div className="sidebar-inner">
            <div className="sidebar-header" style={{ '--item-index': 0 } as React.CSSProperties}>
              <span className="sidebar-title">MODULES</span>
              <span className="sidebar-count">{sections.length}</span>
            </div>
            <nav className="sidebar-menu">
              {/* Home Button */}
              <button
                className="sidebar-item sidebar-item-home"
                onClick={goHome}
                style={{ '--item-index': 1 } as React.CSSProperties}
              >
                <span className="sidebar-item-indicator" />
                <span className="sidebar-item-icon">&lt;</span>
                <span className="sidebar-item-label">Home</span>
              </button>

              {/* Module Items */}
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`sidebar-item ${isTabActive(section.id) ? 'active' : ''}`}
                  onClick={() => selectTab(section.id)}
                  style={{ '--item-index': index + 2 } as React.CSSProperties}
                  aria-pressed={isTabActive(section.id)}
                >
                  <span className="sidebar-item-indicator" />
                  <span className="sidebar-item-number">
                    {String(section.id).padStart(2, '0')}
                  </span>
                  <span className="sidebar-item-label">{section.title}</span>
                  <span className="sidebar-item-arrow">&gt;</span>
                </button>
              ))}
            </nav>
            <div className="sidebar-footer" style={{ '--item-index': sections.length + 2 } as React.CSSProperties}>
              <span className={`sidebar-status sidebar-status-${systemStatus.connection.toLowerCase()}`}>
                <span className="status-dot" />
                {systemStatus.connection}
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Layout - Scroll-snap slides */}
      <div className="content-mobile">
        {sections.map((section) => (
          <MobileSlide key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
};

interface MobileSlideProps {
  section: Section;
}

const MobileSlide: React.FC<MobileSlideProps> = ({ section }) => (
  <div className="mobile-slide">
    <div className="mobile-terminal">
      {/* HUD Corner Brackets */}
      <div className="mobile-bracket mobile-bracket-tl" />
      <div className="mobile-bracket mobile-bracket-tr" />
      <div className="mobile-bracket mobile-bracket-bl" />
      <div className="mobile-bracket mobile-bracket-br" />

      {/* Scan lines */}
      <div className="mobile-scan-lines" />

      {/* Top HUD bar */}
      <div className="mobile-hud-bar mobile-hud-top">
        <span className="mobile-hud-label">MODULE</span>
        <span className="mobile-hud-value">{String(section.id).padStart(3, '0')}</span>
      </div>

      {/* Content */}
      <div className="mobile-terminal-content">
        <div className="mobile-section-header">
          <span className="mobile-marker">&gt;&gt;</span>
          <h2 className="mobile-title">{section.title}</h2>
        </div>
        <div className="mobile-section-body">
          <MobileContentRenderer content={section.content} />
        </div>
      </div>

      {/* Bottom HUD bar */}
      <div className="mobile-hud-bar mobile-hud-bottom">
        <span className="mobile-hud-status">
          <span className="mobile-status-dot" />
          LOADED
        </span>
        <span className="mobile-hud-id">SABINO-001</span>
      </div>
    </div>
  </div>
);

export default ContentSection;
