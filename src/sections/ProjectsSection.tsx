import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';

const PROJECTS = [
  {
    num: "01",
    client: "Client",
    name: "Digital Forge",
    href: "https://digital-forge-sigma.vercel.app/",
    images: [
      "/digital-forge-1.png",
      "/digital-forge-2.png",
      "/digital-forge-3.png"
    ]
  },
  {
    num: "02",
    client: "Personal",
    name: "Nature Like",
    href: "https://shubhankarsahu09.github.io/nature-like/",
    images: [
      "/nature-like-1.png",
      "/nature-like-2.png",
      "/nature-like-3.png"
    ]
  },
  {
    num: "03",
    client: "Client",
    name: "Monster Energy",
    href: "https://shubhankarsahu09.github.io/Monster-Energy-Drink/",
    images: [
      "/monster-1.png",
      "/monster-2.png",
      "/monster-3.png"
    ]
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Project
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-0 max-w-[1400px] mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} totalCards={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, totalCards }: { project: any, index: number, totalCards: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div 
      ref={containerRef} 
      className="h-[85vh] sticky top-[calc(6rem+var(--offset))] md:top-[calc(8rem+var(--offset))] w-full" 
      style={{ '--offset': `${index * 28}px` } as React.CSSProperties}
    >
      <motion.div 
        style={{ scale }}
        className="bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 h-full shadow-2xl origin-top"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="font-black text-[#D7E2EA] leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}>
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm tracking-widest font-medium mb-1">
                {project.client}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.href} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 flex-1 min-h-0">
          <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-6 h-full min-h-0">
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-white/5 shrink min-h-0" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
              <img src={project.images[0]} alt={`${project.name} preview 1`} className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-white/5 flex-1 shrink min-h-0" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
              <img src={project.images[1]} alt={`${project.name} preview 2`} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full sm:w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-white/5 h-[300px] sm:h-auto shrink min-h-0">
            <img src={project.images[2]} alt={`${project.name} main preview`} className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
