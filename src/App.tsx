import { useState, useEffect } from 'react';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';
import { PricePage } from './pages/PricePage';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      
      // If we navigate back to home with a scroll anchor, scroll smoothly after navigation toggles
      const currentAnchor = window.location.hash;
      if (currentAnchor && currentAnchor !== '#price') {
        const elementId = currentAnchor.replace('#', '');
        // Small delay to let the DOM paint home page sections before scrolling
        setTimeout(() => {
          const targetElement = document.getElementById(elementId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash on mount (in case they land directly on #price or an anchor)
    if (window.location.hash && window.location.hash !== '#price') {
      const elementId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isPricePage = currentHash === '#price';

  if (isPricePage) {
    return <PricePage />;
  }

  return (
    <div className="w-full h-full text-[#D7E2EA] font-sans antialiased overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer Signature */}
      <footer className="w-full bg-[#0C0C0C] border-t border-white/5 py-10 flex flex-col justify-center items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]/40 font-light uppercase tracking-wider">
        <div>© 2026 Shubh. All Rights Reserved.</div>
        <div className="text-[10px] text-[#D7E2EA]/20 normal-case">Crafting unforgettable digital experiences</div>
      </footer>
    </div>
  );
}

export default App;
