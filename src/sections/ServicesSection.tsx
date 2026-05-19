import React from 'react';
import { FadeIn } from '../components/FadeIn';

const SERVICES = [
  {
    num: "01",
    title: "Frontend Development",
    desc: "Building responsive, interactive, and dynamic user interfaces using modern frameworks like React and Next.js."
  },
  {
    num: "02",
    title: "Backend Architecture",
    desc: "Developing robust, scalable server-side applications and secure APIs that power complex business logic."
  },
  {
    num: "03",
    title: "Database Design",
    desc: "Structuring and optimizing relational and NoSQL databases to ensure data integrity, fast queries, and reliable performance."
  },
  {
    num: "04",
    title: "Full Stack Integration",
    desc: "Seamlessly connecting frontend applications with backend services and third-party APIs for a cohesive experience."
  },
  {
    num: "05",
    title: "Web Design",
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={40}>
        <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {SERVICES.map((service, i) => (
          <FadeIn 
            key={service.num} 
            delay={i * 0.1} 
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 border-t border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 last:border-b"
          >
            <div className="font-black text-[#0C0C0C] shrink-0 leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {service.num}
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {service.title}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                {service.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
