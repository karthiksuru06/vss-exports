import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const HeroParallax = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { t } = useTranslation();

  const textY = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-midnight-900">

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/40 to-black/30 z-20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-10 mix-blend-overlay"></div>

        {/* Simulating a video with a high-quality GIF or looping visual for this environment */}
        <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover scale-110 motion-safe:animate-pulse-slow"
        >
             {/* Using a placeholder ocean video for demo purposes */}
             <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-ocean-surface-1151-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center max-w-5xl mx-auto"
      >
        <div className="overflow-hidden mb-6">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold-500/30 bg-midnight-900/50 backdrop-blur-md"
            >
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                <span className="text-white text-xs font-semibold tracking-widest uppercase">Global Export Leader</span>
            </motion.div>
        </div>

        <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-white mb-8 leading-[0.9] tracking-tight text-shadow-lg"
        >
            {t('hero.title').split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "italic text-gold-500 px-2" : ""}>{word} </span>
            ))}
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-2xl text-ocean-100/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
            {t('hero.subtitle')}
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
        >
            <Link to="/products" className="group">
                <button className="px-10 py-4 bg-gold-600 hover:bg-gold-500 text-midnight-900 font-bold text-lg tracking-wide rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 transform group-hover:-translate-y-1 flex items-center gap-2">
                    {t('cta.explore')}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </motion.div>
      </motion.div>

      {/* Floating Elements / Particles */}
      <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: [0, 0.4, 0], y: -100, x: Math.random() * 100 - 50 }}
                transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
                className="absolute w-2 h-2 bg-gold-400 rounded-full blur-[2px]"
                style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${60 + Math.random() * 40}%`
                }}
              />
          ))}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 text-white/30"
      >
        <ChevronDown size={40} strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default HeroParallax;
