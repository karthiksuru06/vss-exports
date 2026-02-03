/**
 * HeroParallax - Animated Hero Section
 *
 * Features:
 * - Parallax video background
 * - Animated text effects (split, gradient, typewriter)
 * - Floating particles
 * - Smooth scroll-based opacity
 */

import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Anchor, Fish, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import {
  SplitText,
  GradientText,
  TypewriterText,
  BlurReveal,
  TextRevealByWord,
  ShinyText,
} from '../ui/AnimatedText';

const HeroParallax = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  const textY = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Split title into words for individual animation
  const titleWords = t('hero.title').split(' ');

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-midnight-900">

      {/* Video Background with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/50 to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-900/30 via-transparent to-midnight-900/30 z-20" />

        {/* Animated grain texture */}
        <div
          className="absolute inset-0 z-30 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover scale-110"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-ocean-surface-1151-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center max-w-6xl mx-auto"
      >
        {/* Top Badge - Animated entry */}
        <div className="overflow-hidden mb-8">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full border border-gold-500/30 bg-midnight-900/60 backdrop-blur-md"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-gold-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-white/90 text-xs font-semibold tracking-[0.2em] uppercase">
              {t('brand.tagline')}
            </span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Anchor className="w-4 h-4 text-gold-500" />
            </motion.div>
          </motion.div>
        </div>

        {/* Main Title - Split animation with gradient highlight */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-[0.9] tracking-tight"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', rotateX: -80 }}
                animate={isLoaded ? { y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {i === 1 ? (
                  // The highlighted word (usually "Ocean" or similar)
                  <GradientText
                    colors={['#d4af37', '#f5d77a', '#d4af37', '#c9a227', '#d4af37']}
                    animationDuration={4}
                    className="italic"
                  >
                    {word}
                  </GradientText>
                ) : (
                  <ShinyText
                    baseColor="#ffffff"
                    shineColor="rgba(212, 175, 55, 0.5)"
                    duration={3 + i}
                  >
                    {word}
                  </ShinyText>
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isLoaded ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        />

        {/* Subtitle - Typewriter effect */}
        <motion.div
          className="text-lg sm:text-xl md:text-2xl text-ocean-100/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <BlurReveal delay={1.2} duration={1}>
            <TextRevealByWord delay={1.3} staggerDelay={0.08}>
              {t('hero.subtitle')}
            </TextRevealByWord>
          </BlurReveal>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link to="/products" className="group">
            <motion.button
              className="relative px-10 py-4 bg-gold-600 hover:bg-gold-500 text-midnight-900 font-bold text-lg tracking-wide rounded-sm overflow-hidden transition-colors duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: '-200%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Button shadow glow */}
              <div className="absolute inset-0 rounded-sm shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-shadow duration-300" />

              <span className="relative flex items-center gap-2">
                {t('cta.explore')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          <Link to="/contact" className="group">
            <motion.button
              className="px-10 py-4 bg-transparent border border-white/30 hover:border-gold-500/50 hover:bg-white/5 text-white font-medium text-lg tracking-wide rounded-sm transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                {t('hero.getInTouch')}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Marine Elements */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-50, -300],
              x: [0, Math.sin(i) * 50],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${70 + Math.random() * 30}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Floating icons */}
        <motion.div
          className="absolute left-[10%] top-[30%] text-gold-500/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Fish size={40} />
        </motion.div>

        <motion.div
          className="absolute right-[15%] top-[25%] text-gold-500/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Ship size={50} />
        </motion.div>

        <motion.div
          className="absolute left-[80%] top-[60%] text-gold-500/15"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Anchor size={35} />
        </motion.div>
      </div>

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-24 overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 100"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            fill="rgba(5, 27, 48, 0.8)"
            animate={{
              d: [
                "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z",
                "M0,60 C360,20 1080,80 1440,40 L1440,100 L0,100 Z",
                "M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroParallax;
