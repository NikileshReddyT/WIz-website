// src/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
// Ensure all icons used are imported correctly
import {
    FiChevronDown, FiBriefcase, FiBarChart2, FiCpu, FiTrendingUp,
    FiShield, FiAward, FiMail, FiPhone
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import homei from '../assets/homei.jpg'; // Make sure this path exists relative to this file

// --- Configuration Constants ---
// Ensure this object is correctly defined before use
const config = {
  companyName: "WIZ INFRA TRADES",
  heroHeadline: "IT'S TIME TO BUILD YOUR ECONOMY",
  heroSubtext:
    "Make your work easier with an integrated ecosystem that lets all departments collaborate seamlessly and smartly.",
  aboutHeadline: "About WIZ InfraTrades",
  aboutText:
    "WIZ InfraTrades is a multi-sector powerhouse delivering excellence in construction, finance, technology, and beyond. We champion innovation and sustainable development to empower communities and drive economic evolution.",
  heroImageAlt: "Collaborative ecosystem illustration",
  getStartedButtonText: "Get Started",
  // Placeholder data for new sections - VERIFY ICONS MATCH IMPORTS
  services: [
    { icon: FiBriefcase, title: "Construction", description: "Delivering robust infrastructure projects with precision and quality." },
    { icon: FiBarChart2, title: "Finance", description: "Strategic financial planning and investment solutions for growth." },
    { icon: FiCpu, title: "Technology", description: "Implementing cutting-edge tech for smarter, efficient operations." },
    { icon: FiTrendingUp, title: "Development", description: "Sustainable development practices for community empowerment." },
  ],
  benefits: [
     { icon: FiAward, title: "Proven Excellence", description: "A track record of successful projects across multiple sectors." },
     { icon: FiTrendingUp, title: "Innovation Driven", description: "Constantly adopting new technologies and methods for better results." },
     { icon: FiShield, title: "Sustainable Focus", description: "Committed to environmentally responsible and sustainable development." },
     { icon: FiBriefcase, title: "Integrated Approach", description: "Seamless collaboration across departments for holistic solutions." }, // Reused FiBriefcase here, ensure it's intended or change icon
  ],
  ctaHeadline: "Ready to Elevate Your Project?",
  ctaText: "Let WIZ InfraTrades be your partner in building a successful future. Contact us today to discuss your needs.",
  ctaButtonText: "Contact Us",
  // Animation config
  animation: {
    duration: 0.8,
    stagger: 0.1,
    ease: 'easeInOut',
    typingStagger: 0.06,
  },
};

// --- Animation Variants ---

// Hero Section Variants (Keep as they were working)
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: config.animation.stagger, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: config.animation.duration, ease: config.animation.ease } },
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: config.animation.duration * 1.2, ease: config.animation.ease, delay: 0.4 } },
};
const typingContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.4, staggerChildren: config.animation.typingStagger } },
};
const typingLetterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// About Section Variants (Keep as they were)
const aboutVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 1.3 } }
};

// Simplified variants for new sections
const sectionFadeIn = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } } // Added stagger here
};

const cardFadeIn = {
    offscreen: { opacity: 0, y: 30, scale: 0.95 },
    onscreen: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};


/**
 * Renders the main landing page for WIZ Infra Projects.
 * Includes Hero, About, Services, Benefits, and CTA sections.
 * Corrected structure and simplified animations for stability.
 */
function HomePage() {
  // Ensure useNavigate is called at the top level
  const navigate = useNavigate();

  // Decorative elements data (ensure correctness)
  const decorativeElements = [
    { id: 1, position: 'absolute top-[-15%] left-[-10%]', sizeClasses: 'w-80 h-80', style: { backgroundColor: 'rgba(234, 179, 8, 0.03)' }, animate: { scale: [1, 1.05, 1], rotate: [0, -10, 0], x: [0, 10, 0]}, transition: { duration: 40, repeat: Infinity, ease: 'easeInOut' }},
    { id: 2, position: 'absolute bottom-[-20%] right-[-15%]', sizeClasses: 'w-96 h-96', style: { backgroundColor: 'rgba(34, 197, 94, 0.03)' }, animate: { scale: [1, 1.06, 1], rotate: [0, 8, 0], y: [0, -10, 0] }, transition: { duration: 45, repeat: Infinity, ease: 'easeInOut' }},
  ];

  // Split headline into words (ensure correctness)
  const headlineWords = config.heroHeadline.split(' ');

  return (
    // Make sure there's a single root element
    <div className="min-h-screen bg-gradient-to-br from-[#030d34] to-[#01061a] text-white relative overflow-hidden font-sans antialiased">

      {/* Render Decorative Elements */}
      {decorativeElements.map((el) => (
        <motion.div
          key={el.id}
          className={`${el.position} ${el.sizeClasses} rounded-full filter blur-sm`}
          style={el.style}
          animate={el.animate}
          transition={el.transition}
          aria-hidden="true"
        />
      ))}

      {/* Main Content Wrapper */}
      <main>

        {/* --- Hero Section --- */}
        {/* Verify this section's structure and props */}
        <motion.section
          className="container mx-auto px-6 py-24 md:py-32 min-h-screen flex flex-col justify-center relative z-10"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          aria-labelledby="hero-headline"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Hero Text Content */}
            <div className="space-y-7 md:space-y-8 text-center md:text-left">
              <motion.p
                className="text-yellow-400 text-sm md:text-base font-semibold tracking-wider uppercase"
                variants={itemVariants}
              >
                {config.companyName}
              </motion.p>

              {/* Headline structure */}
              <motion.h1
                id="hero-headline"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]" // Adjusted min-heights again, TEST THESE
                variants={typingContainerVariants}
                aria-label={config.heroHeadline}
              >
                {headlineWords.map((word, wordIndex) => (
                  <span key={`word-${word}-${wordIndex}`} className="inline-block mr-[0.25em] whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={`char-${wordIndex}-${char}-${charIndex}`}
                        variants={typingLetterVariants}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto md:mx-0"
                variants={itemVariants}
              >
                {config.heroSubtext}
              </motion.p>

              {/* Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  className="inline-block bg-yellow-400 text-[#010821] font-bold px-8 py-3 text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#01061a] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400"
                  whileHover={{ scale: 1.05, boxShadow: "0px 12px 28px rgba(234, 179, 8, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/signin")} // Ensure '/signin' route exists
                >
                  {config.getStartedButtonText}
                </motion.button>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              className="flex justify-center md:justify-end mt-8 md:mt-0"
              variants={imageVariants}
            >
              <img
                src={homei}
                alt={config.heroImageAlt}
                className="rounded-xl shadow-2xl object-cover w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3]"
                loading="lazy"
                width="600"
                height="450"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* --- About Section --- */}
        {/* Verify this section's structure and props */}
        <motion.section
          className="py-24 md:py-32 bg-[#0A0E2A] relative shadow-inner border-t border-yellow-400/10"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={aboutVariants} // Use original aboutVariants
          aria-labelledby="about-headline"
        >
          <div className="container mx-auto px-6">
            {/* Content should be direct child for variants usually, but structure is simple here */}
            <div className="max-w-3xl mx-auto text-center">
                <h2 id="about-headline" className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {config.aboutHeadline}
                </h2>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  {config.aboutText}
                </p>
            </div>
          </div>
        </motion.section>

        {/* === Services Section === */}
        {/* Animate section container, stagger children */}
        <motion.section
            className="py-24 md:py-32 bg-[#030d34]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFadeIn} // Apply variant with staggerChildren
            aria-labelledby="services-headline"
        >
            <div className="container mx-auto px-6">
                <h2 id="services-headline" className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
                    Our Core Services
                </h2>
                {/* Grid container doesn't need variants if parent handles stagger */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {config.services.map((service, index) => {
                         // Check if service.icon exists and is a valid component
                         const IconComponent = service.icon;
                         return (
                            <motion.div
                                key={`service-${index}`}
                                className="bg-[#0A0E2A] p-6 rounded-lg shadow-lg text-center border border-gray-700/50 hover:border-yellow-400/50 transition-colors duration-300"
                                variants={cardFadeIn} // Animate each card directly
                            >
                                {IconComponent && ( // Render icon only if it exists
                                    <div className="mb-4 text-yellow-400 inline-block">
                                        <IconComponent size={40} />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
        {/* === END Services Section === */}

        {/* === Why Choose Us Section === */}
         <motion.section
            className="py-24 md:py-32 bg-[#0A0E2A]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionFadeIn} // Apply variant with staggerChildren
            aria-labelledby="benefits-headline"
        >
            <div className="container mx-auto px-6">
                <h2 id="benefits-headline" className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
                    Why Partner with WIZ InfraTrades?
                </h2>
                 {/* Grid container doesn't need variants if parent handles stagger */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    {config.benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                         <motion.div
                            key={`benefit-${index}`}
                            className="flex items-start space-x-4 p-4"
                            variants={cardFadeIn} // Animate each item directly
                         >
                            {IconComponent && ( // Render icon only if it exists
                                <div className="mt-1 text-yellow-400 flex-shrink-0">
                                    <IconComponent size={32} />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                            </div>
                         </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
        {/* === END Why Choose Us Section === */}

        {/* === Call to Action Section === */}
        <motion.section
            className="py-20 md:py-28 bg-gradient-to-r from-yellow-500/10 to-green-500/10"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionFadeIn} // Apply simple fade-in, stagger won't affect much here
            aria-labelledby="cta-headline"
        >
            <div className="container mx-auto px-6 text-center">
                 {/* Wrap content in motion.div if staggering needed, not necessary here */}
                 <div>
                    <h2 id="cta-headline" className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        {config.ctaHeadline}
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                        {config.ctaText}
                    </p>
                    <motion.button
                        className="inline-block bg-yellow-400 text-[#010821] font-bold px-10 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#01061a] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400"
                        whileHover={{ scale: 1.05, boxShadow: "0px 12px 28px rgba(234, 179, 8, 0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/contact")} // Ensure '/contact' route exists
                     >
                        {config.ctaButtonText}
                     </motion.button>

                     {/* Optional: Add quick contact icons */}
                     <div className="mt-12 flex justify-center space-x-8 text-gray-400">
                         <a href="mailto:info@wizinfra.com" className="hover:text-yellow-400 transition-colors flex items-center space-x-2">
                             <FiMail size={20}/>
                             <span>info@wizinfra.com</span> {/* Replace with actual email */}
                         </a>
                         <a href="tel:+911234567890" className="hover:text-yellow-400 transition-colors flex items-center space-x-2">
                            <FiPhone size={20}/>
                            <span>+91 123 456 7890</span> {/* Replace with actual phone */}
                         </a>
                     </div>
                 </div>
            </div>
        </motion.section>
        {/* === END Call to Action Section === */}

      </main>

      {/* --- Scroll Down Indicator --- */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white opacity-70 z-10 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 0.7, 0.7, 0.7, 0], y: [0, 12, 0] }}
        transition={{
           duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 3.5,
           opacity: { times: [0, 0.2, 0.8, 0.9, 1], duration: 2.8 },
           y: { duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
        }}
        aria-hidden="true"
      >
        <FiChevronDown size={26} />
      </motion.div>

    </div> // Ensure root div closes correctly
  );
}

export default HomePage; // Make sure export is default