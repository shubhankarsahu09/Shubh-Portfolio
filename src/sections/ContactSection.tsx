import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      // Slower fallback simulation for local testing when no key is set up yet
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        console.warn("Web3Forms Access Key is not configured in .env. Simulating successful submit.");
      }, 1500);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrors((prev) => ({ ...prev, form: result.message || 'Something went wrong. Please try again.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, form: 'Network error. Please check your internet connection and try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen relative flex flex-col justify-center items-center bg-[#0C0C0C] py-20 px-5 sm:px-8 md:px-10 overflow-hidden">
      
      {/* Dynamic Background Glows for Vibe */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#B600A8]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#7621B0]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[680px] flex flex-col items-center">
        
        {/* Massive Premium Section Title */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-10 sm:mb-14">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}>
            Get in touch
          </h2>
          <p className="text-[#D7E2EA]/60 font-light tracking-wide max-w-[420px] mx-auto mt-4 text-sm sm:text-base leading-relaxed">
            Have a project in mind or just want to say hi? Drop a message below and let&apos;s build something incredible.
          </p>
        </FadeIn>

        {/* Contact Form Wrapper */}
        <FadeIn delay={0.15} y={40} className="w-full relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col gap-6 sm:gap-8 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
              >
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm font-medium tracking-widest pl-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className={`w-full bg-[#121212]/60 border rounded-2xl px-5 py-4 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                        : 'border-white/10 hover:border-white/20 focus:border-[#B600A8] focus:ring-2 focus:ring-[#B600A8]/20'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500/80 text-xs sm:text-sm font-light pl-1 mt-1">{errors.name}</span>
                  )}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm font-medium tracking-widest pl-1">
                    Your Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className={`w-full bg-[#121212]/60 border rounded-2xl px-5 py-4 text-sm sm:text-base text-white placeholder-white/20 outline-none transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                        : 'border-white/10 hover:border-white/20 focus:border-[#B600A8] focus:ring-2 focus:ring-[#B600A8]/20'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500/80 text-xs sm:text-sm font-light pl-1 mt-1">{errors.email}</span>
                  )}
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm font-medium tracking-widest pl-1">
                    Your Message
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    disabled={isSubmitting}
                    rows={5}
                    className={`w-full bg-[#121212]/60 border rounded-2xl px-5 py-4 text-sm sm:text-base text-white placeholder-white/20 outline-none resize-none transition-all duration-300 ${
                      errors.message 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                        : 'border-white/10 hover:border-white/20 focus:border-[#B600A8] focus:ring-2 focus:ring-[#B600A8]/20'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-red-500/80 text-xs sm:text-sm font-light pl-1 mt-1">{errors.message}</span>
                  )}
                </div>

                {/* Global Error Banner */}
                {errors.form && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-xs sm:text-sm text-red-400 font-light flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* Premium Gradient Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative rounded-full py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest outline-none transition-transform hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-[0_12px_40px_-10px_rgba(182,0,168,0.3)] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 overflow-hidden"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid white',
                    outlineOffset: '-3px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </motion.form>
            ) : (
              /* High-End Success Card Overlay */
              <motion.div 
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col items-center text-center bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[32px] p-10 sm:p-16 md:p-20 shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
              >
                {/* Glowing Success Ring */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#B600A8] to-[#7621B0] flex items-center justify-center shadow-[0_0_30px_rgba(182,0,168,0.4)] relative mb-8">
                  {/* Decorative particles */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#BE4C00] rounded-full blur-[2px] animate-pulse" />
                  <span className="absolute -bottom-2 -left-1 w-2.5 h-2.5 bg-white rounded-full blur-[1px]" />
                  
                  {/* Drawing Checkmark Animation */}
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                  Message Sent!
                </h3>
                <p className="text-[#D7E2EA]/70 font-light tracking-wide max-w-[420px] mt-4 text-sm sm:text-base leading-relaxed">
                  Thank you so much for reaching out! Your message was sent successfully. Shubh will get back to you within 24 hours.
                </p>

                <button 
                  onClick={() => setIsSuccess(false)}
                  className="rounded-full border border-white/20 text-[#D7E2EA]/80 font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm hover:bg-white/5 hover:text-white transition-all duration-300 mt-10 active:scale-95"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
};
