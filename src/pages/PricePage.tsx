import React, { useState } from 'react';
import { FadeIn } from '../components/FadeIn';

export const PricePage: React.FC = () => {
  // Navigation & Page State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculator State
  const [serviceType, setServiceType] = useState<'design' | 'development' | 'both'>('both');
  const [pages, setPages] = useState<number>(5);
  const [needContent, setNeedContent] = useState<boolean>(false);
  const [needSEO, setNeedSEO] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<'regular' | 'fast' | 'rush'>('regular');

  // Trigger Toast Notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Pricing Estimations Logic
  const calculatePrice = (): number => {
    let base = 299;
    let perPage = 150;

    if (serviceType === 'design') {
      base = 150;
      perPage = 50;
    } else if (serviceType === 'development') {
      base = 199;
      perPage = 75;
    }

    let total = Math.max(base, base + (pages - 1) * perPage);
    
    if (needContent) total += pages * 50;
    if (needSEO) total += pages * 50;
    
    if (timeline === 'rush') {
      total += pages * 100;
    } else if (timeline === 'fast') {
      total += pages * 25;
    }

    return total;
  };

  const calculateAgencyCost = (): number => {
    const perPage = serviceType === 'both' ? 400 : 200;
    return 2500 + (pages - 1) * perPage;
  };

  const calculateFreelancerCost = (): number => {
    const perPage = serviceType === 'both' ? 200 : 100;
    return 800 + (pages - 1) * perPage;
  };

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`;
  };

  // Copy Price Estimate Summary to Clipboard
  const handleCopyEstimate = () => {
    const summaryText = `Project Estimate Summary:
--------------------------------
- Service: ${serviceType === 'both' ? 'Design + Development' : serviceType === 'design' ? 'Only Design' : 'Only Development'}
- Pages: ${pages}
- Content Assistance: ${needContent ? 'Yes' : 'No'}
- SEO Optimization: ${needSEO ? 'Yes' : 'No'}
- Delivery Timeline: ${timeline === 'rush' ? 'Within 7 Days' : timeline === 'fast' ? 'Within 14 Days' : 'Regular Speed'}
--------------------------------
Total Webfluin Studio Price: ${formatPrice(calculatePrice())}
Agency Cost (Market average): ${formatPrice(calculateAgencyCost())}
Freelancer Cost (Market average): ${formatPrice(calculateFreelancerCost())}`;

    navigator.clipboard.writeText(summaryText);
    showToast("Price estimate copied to clipboard!");
  };

  const tiers = [
    {
      title: "Portfolio / Landing Page",
      price: "$150 - $300",
      description: "A gorgeous single-page website to show off your personal brand, services, or launch a product.",
      features: [
        "Striking Custom 3D & Vector Styling",
        "Fluid Micro-Animations & Framer Motion",
        "100% Fully Responsive Layout",
        "SEO Best-Practices Implemented",
        "Contact Form Integration",
        "Fast Page Speed Optimization"
      ],
      glow: "from-[#B600A8]/20 to-[#7621B0]/20"
    },
    {
      title: "Multi-page Business Site",
      price: "$300- $1000",
      description: "A complete professional website optimized for showcasing multiple services, pages, reviews, and client inquiries.",
      features: [
        "Up to 5 Fully Responsive Custom Pages",
        "Sophisticated Dynamic Theme Elements",
        "Advanced Interactive Workflows",
        "Speed & Structural Auditing",
        "Custom Lead Capturing Form Systems",
        "Standard API / CMS Integrations"
      ],
      glow: "from-[#7621B0]/20 to-[#BE4C00]/20",
      popular: true
    },
    {
      title: "Full-Stack Custom Web App",
      price: "$1,000 - $4,000+",
      description: "A fully personalized, production-grade application featuring secure databases, user login, dashboards, and automated logic.",
      features: [
        "Robust User Authentication Systems",
        "Advanced Databases (SQL / NoSQL)",
        "Dynamic Dashboard Interactive Views",
        "Local Storage / State Management",
        "Payment Processors (Stripe / PayPal)",
        "Premium API & Server-less Triggers"
      ],
      glow: "from-[#BE4C00]/20 to-[#B600A8]/20"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased overflow-x-clip flex flex-col justify-between relative">
      
      {/* Glow Rings for Vibe */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B600A8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#7621B0]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Standard Header Navigation */}
      <div className="px-6 md:px-10">
        <FadeIn delay={0} y={-20}>
          <nav className="flex justify-between items-center pt-6 md:pt-8 w-full max-w-[1440px] mx-auto">
            {['About', 'Price', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-all duration-200 ${
                  item === 'Price' 
                    ? 'text-white border-b-2 border-[#B600A8] pb-1' 
                    : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </FadeIn>
      </div>

      {/* Main Pricing Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-6 md:px-10 relative z-10 w-full">
        
        {/* Massive Typography Title */}
        <FadeIn delay={0.15} y={40} className="w-full max-w-[1280px] mx-auto text-center mb-16 md:mb-24">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none" style={{ fontSize: 'clamp(2.2rem, 8vw, 120px)' }}>
            Website Pricing
          </h1>
          <p className="text-[#D7E2EA]/60 font-light tracking-wide max-w-[480px] mx-auto mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Estimates for building custom, highly animated digital assets. Select a tier to bring your product to life.
          </p>
        </FadeIn>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 w-full max-w-[1280px] mx-auto items-stretch mb-24 md:mb-36">
          {tiers.map((tier, idx) => (
            <FadeIn 
              key={tier.title} 
              delay={0.25 + idx * 0.1} 
              y={50}
              className="flex flex-col h-full w-full"
            >
              <div 
                className={`relative w-full h-full flex flex-col justify-between bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-md border rounded-[32px] p-6 sm:p-8 transition-all duration-500 group shadow-[0_24px_80px_rgba(0,0,0,0.5)] ${
                  tier.popular ? 'border-[#B600A8]/50 ring-1 ring-[#B600A8]/20' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Glowing Aura inside Card on Hover */}
                <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-tr ${tier.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl -z-10`} />

                {/* Card Top Information */}
                <div>
                  {tier.popular && (
                    <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest text-[#B600A8] uppercase mb-4 bg-[#B600A8]/10 px-3 py-1 rounded-full border border-[#B600A8]/20">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide mb-2 mt-1">
                    {tier.title}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#BBCCD7]/70 mb-4 mt-2">
                    {tier.price}
                  </div>
                  <p className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#B600A8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#D7E2EA]/70 font-light text-xs sm:text-sm tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="mt-8 pt-4">
                  <a 
                    href="#contact"
                    className="w-full relative rounded-full py-3.5 text-xs sm:text-sm text-center font-medium uppercase tracking-widest outline-none transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden"
                    style={{
                      background: tier.popular 
                        ? 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' 
                        : 'rgba(255,255,255,0.03)',
                      boxShadow: tier.popular 
                        ? '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1' 
                        : 'none',
                      border: tier.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      outline: tier.popular ? '2px solid white' : 'none',
                      outlineOffset: tier.popular ? '-3px' : '0'
                    }}
                  >
                    <span>Get Started</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* RECREATED PROJECT ESTIMATION CALCULATOR SECTION */}
        {/* ------------------------------------------------------------- */}
        <section id="calculator-section" className="w-full max-w-7xl mx-auto py-16 md:py-28 px-6 md:px-10 bg-background relative z-20">
          
          {/* Header */}
          <FadeIn delay={0} y={40} className="w-full text-center mb-12 md:mb-16">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/40 mb-3 block">
              Try project estimation calculator
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white uppercase tracking-tight max-w-[620px] mx-auto mt-2 leading-tight">
              Get premium website within your budget
            </h2>
          </FadeIn>

          {/* Calculator Layout */}
          <FadeIn delay={0.15} y={40} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              
              {/* LEFT COLUMN: Calculator Form */}
              <div className="bg-[#0D0D0D] p-8 lg:p-12 flex flex-col divide-y divide-[#1E1E1E]">
                
                {/* Section 1: Service Type */}
                <div className="flex flex-col gap-5 pb-8">
                  <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white">
                    What kind of service do you need?
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-1">
                    {(['design', 'development', 'both'] as const).map((type) => (
                      <label 
                        key={type}
                        onClick={() => setServiceType(type)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          serviceType === type ? 'border-[#FF5656]' : 'border-white/20 group-hover:border-white/45'
                        }`}>
                          {serviceType === type && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                          )}
                        </div>
                        <span className="text-sm sm:text-base text-[#D7E2EA]/80 font-light select-none capitalize">
                          {type === 'both' ? 'Design + Development' : type === 'design' ? 'Only Design' : 'Only Development'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section 2: Number of Pages */}
                <div className="flex flex-col gap-5 py-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white">
                      Number of Pages
                    </h3>
                    <span className="text-xl sm:text-2xl font-black text-[#FF5656]">
                      {pages}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2 w-full">
                    {/* Recreating Shadcn progressive rail slider */}
                    <input 
                      type="range" 
                      min={1} 
                      max={30} 
                      value={pages}
                      onChange={(e) => setPages(Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none transition-all accent-[#FF5656]"
                      style={{
                        background: `linear-gradient(to right, #FF5656 0%, #FF5656 ${(pages - 1) / 29 * 100}%, #1E1E1E ${(pages - 1) / 29 * 100}%, #1E1E1E 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-[#D7E2EA]/40 font-mono tracking-widest pl-1 pr-1 mt-1 select-none">
                      <span>1</span>
                      <span>30</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Add-ons */}
                <div className="flex flex-col gap-5 py-8">
                  <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white">
                    Add-ons
                  </h3>
                  <div className="flex flex-col gap-4 mt-1">
                    {/* Add-on 1 */}
                    <label 
                      onClick={() => setNeedContent(!needContent)}
                      className="flex items-start sm:items-center justify-between gap-4 cursor-pointer group bg-white/[0.01] hover:bg-white/[0.02] p-4 rounded-xl border border-white/5 transition-all select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-all ${
                          needContent ? 'border-[#FF5656] bg-[#FF5656]' : 'border-white/20 group-hover:border-white/40'
                        }`}>
                          {needContent && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-snug">
                          I will need help with content
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#FF5656] flex-shrink-0">+$50/pages</span>
                    </label>

                    {/* Add-on 2 */}
                    <label 
                      onClick={() => setNeedSEO(!needSEO)}
                      className="flex items-start sm:items-center justify-between gap-4 cursor-pointer group bg-white/[0.01] hover:bg-white/[0.02] p-4 rounded-xl border border-white/5 transition-all select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-all ${
                          needSEO ? 'border-[#FF5656] bg-[#FF5656]' : 'border-white/20 group-hover:border-white/40'
                        }`}>
                          {needSEO && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-snug">
                          I want to optimize my website for SEO
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#FF5656] flex-shrink-0">+$50/pages</span>
                    </label>
                  </div>
                </div>

                {/* Section 4: Timeline */}
                <div className="flex flex-col gap-5 pt-8">
                  <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white">
                    How fast do you need this?
                  </h3>
                  <div className="flex flex-col gap-4 mt-1">
                    {[
                      { key: 'rush', label: 'Within 7 Days', price: '+$100/pages' },
                      { key: 'fast', label: 'Within 14 Days', price: '+$25/pages' },
                      { key: 'regular', label: 'Regular Speed (Based on discussion)', price: 'No extra cost' }
                    ].map((opt) => (
                      <label 
                        key={opt.key}
                        onClick={() => setTimeline(opt.key as any)}
                        className="flex items-center justify-between gap-4 cursor-pointer group bg-white/[0.01] hover:bg-white/[0.02] p-4 rounded-xl border border-white/5 transition-all select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            timeline === opt.key ? 'border-[#FF5656]' : 'border-white/20 group-hover:border-white/40'
                          }`}>
                            {timeline === opt.key && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                            )}
                          </div>
                          <span className="text-sm sm:text-base text-[#D7E2EA]/80 font-light select-none leading-snug">
                            {opt.label}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#FF5656] flex-shrink-0">{opt.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Cost Estimation */}
              <div className="bg-[#0A0A0A] p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between min-h-0 lg:min-h-[718px]">
                
                {/* Header text */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
                    Estimated Cost
                  </h3>
                  <p className="text-sm sm:text-base text-[#D7E2EA]/50 font-light leading-relaxed">
                    Compare market price estimates based on your configuration parameters. We deliver premium outcomes under your budget.
                  </p>
                </div>

                {/* Vertical Comparison Stack */}
                <div className="flex flex-col gap-5 my-8">
                  {/* Card 1: Agency Cost */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
                    <span className="text-xs sm:text-sm uppercase tracking-wider text-[#D7E2EA]/40 font-medium">
                      Typical Agency charges minimum
                    </span>
                    <div className="text-3xl sm:text-4xl font-bold text-white pl-1 mt-1">
                      {formatPrice(calculateAgencyCost())}
                    </div>
                    <span className="text-xs text-[#D7E2EA]/30 font-light pl-1">
                      + Too much extra time & additional cost
                    </span>
                  </div>

                  {/* Card 2: Freelancer Cost */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
                    <span className="text-xs sm:text-sm uppercase tracking-wider text-[#D7E2EA]/40 font-medium">
                      Regular Freelancer charges minimum
                    </span>
                    <div className="text-3xl sm:text-4xl font-bold text-white pl-1 mt-1">
                      {formatPrice(calculateFreelancerCost())}
                    </div>
                    <span className="text-xs text-[#D7E2EA]/30 font-light pl-1">
                      + Too much headache & back-and-forth
                    </span>
                  </div>

                  {/* Card 3: Webfluin Studio Price */}
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl p-6 flex flex-col gap-2 shadow-xl shadow-orange-500/5 relative overflow-hidden">
                    {/* Glowing highlight sphere inside Studio card */}
                    <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-white/70 font-semibold">
                      With Webfluin Studio
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-white pl-1 mt-1 tracking-tight">
                      {formatPrice(calculatePrice())}
                    </div>
                    <span className="text-xs text-white/80 font-light pl-1">
                      Save your money, time & headache
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleCopyEstimate}
                    className="flex-1 rounded-full border border-white/15 hover:border-white/30 text-white font-medium uppercase tracking-wider px-6 py-4 text-xs sm:text-sm hover:bg-white/5 active:scale-95 transition-all duration-300"
                  >
                    Copy Price Estimate
                  </button>
                  <a 
                    href="#contact"
                    className="flex-1 rounded-full text-center font-medium uppercase tracking-wider px-6 py-4 text-xs sm:text-sm text-white active:scale-95 transition-transform overflow-hidden shadow-[0_8px_30px_rgba(255,86,86,0.15)]"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                      outline: '2px solid white',
                      outlineOffset: '-3px'
                    }}
                  >
                    Discuss Quote
                  </a>
                </div>

              </div>

            </div>
          </FadeIn>

        </section>
      </main>

      {/* Floating Premium Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <div className="bg-[#121212] border border-white/10 rounded-2xl px-6 py-4 text-sm text-[#D7E2EA] font-medium shadow-[0_24px_50px_rgba(0,0,0,0.8)] tracking-wide uppercase text-xs flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5656]" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="w-full bg-[#0C0C0C] border-t border-white/5 py-10 flex flex-col justify-center items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]/40 font-light uppercase tracking-wider relative z-10">
        <div>© 2026 Shubh. All Rights Reserved.</div>
        <div className="text-[10px] text-[#D7E2EA]/20 normal-case">Crafting unforgettable digital experiences</div>
      </footer>
    </div>
  );
};
