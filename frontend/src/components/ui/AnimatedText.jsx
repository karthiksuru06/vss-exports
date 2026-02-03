/**
 * AnimatedText - Collection of text animation components
 *
 * Components:
 * - SplitText: Character-by-character staggered reveal
 * - GradientText: Animated gradient shine effect
 * - TypewriterText: Classic typewriter effect
 * - WaveText: Wavy floating characters
 * - BlurReveal: Blur-to-clear reveal
 * - ScrambleText: Matrix-style decode effect
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, useInView, stagger, animate } from 'framer-motion';

/**
 * SplitText - Splits text into characters/words with staggered animation
 */
export function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 0.05,
  staggerDelay = 0.03,
  splitBy = 'char', // 'char' | 'word'
  animation = 'fadeUp', // 'fadeUp' | 'fadeIn' | 'slideIn' | 'scale' | 'rotate'
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const text = typeof children === 'string' ? children : '';
  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
    },
  };

  const anim = animations[animation] || animations.fadeUp;

  return (
    <span ref={ref} className={`inline-block ${className}`} {...props}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={anim.initial}
          animate={isInView ? anim.animate : anim.initial}
          transition={{
            duration,
            delay: delay + i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: item === ' ' ? 'pre' : 'normal',
          }}
        >
          {item === ' ' ? '\u00A0' : item}
          {splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * GradientText - Text with animated gradient shine
 */
export function GradientText({
  children,
  className = '',
  colors = ['#d4af37', '#f5d77a', '#d4af37', '#8b6914', '#d4af37'],
  animationDuration = 3,
  ...props
}) {
  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `gradient-shift ${animationDuration}s ease infinite`,
  }), [colors, animationDuration]);

  return (
    <>
      <style>
        {`
          @keyframes gradient-shift {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
          }
        `}
      </style>
      <span className={className} style={gradientStyle} {...props}>
        {children}
      </span>
    </>
  );
}

/**
 * TypewriterText - Classic typewriter effect
 */
export function TypewriterText({
  children,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  onComplete,
  ...props
}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    let timeout;
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      const type = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(type, speed);
        } else {
          onComplete?.();
        }
      };

      type();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, delay, onComplete]);

  // Cursor blink
  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span className={className} {...props}>
      {displayText}
      {cursor && (
        <span
          className="inline-block ml-0.5"
          style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}

/**
 * WaveText - Characters with floating wave animation
 */
export function WaveText({
  children,
  className = '',
  delay = 0,
  waveHeight = 8,
  duration = 2,
  staggerDelay = 0.05,
  ...props
}) {
  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  return (
    <span className={`inline-block ${className}`} {...props}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -waveHeight, 0],
          }}
          transition={{
            duration,
            delay: delay + i * staggerDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * BlurReveal - Text that reveals from blur
 */
export function BlurReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{
        opacity: 0,
        filter: 'blur(20px)',
        scale: 1.1,
      }}
      animate={isInView ? {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.span>
  );
}

/**
 * ScrambleText - Matrix-style text decode effect
 */
export function ScrambleText({
  children,
  className = '',
  delay = 0,
  duration = 1500,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*',
  ...props
}) {
  const [displayText, setDisplayText] = useState('');
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    let timeout;

    const startTimeout = setTimeout(() => {
      const scramble = () => {
        frame++;
        const progress = frame / totalFrames;

        const result = text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          const charProgress = i / text.length;
          if (progress > charProgress + 0.1) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        setDisplayText(result);

        if (frame < totalFrames) {
          timeout = setTimeout(scramble, 30);
        } else {
          setDisplayText(text);
        }
      };

      scramble();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay, duration, chars]);

  return (
    <span className={`font-mono ${className}`} {...props}>
      {displayText || text.replace(/./g, ' ')}
    </span>
  );
}

/**
 * FloatingLetters - Letters that float independently
 */
export function FloatingLetters({
  children,
  className = '',
  floatRange = 5,
  duration = 3,
  ...props
}) {
  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  return (
    <span className={`inline-block ${className}`} {...props}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [
              Math.random() * floatRange,
              -Math.random() * floatRange,
              Math.random() * floatRange,
            ],
            rotate: [
              Math.random() * 3 - 1.5,
              Math.random() * 3 - 1.5,
              Math.random() * 3 - 1.5,
            ],
          }}
          transition={{
            duration: duration + Math.random(),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 0.5,
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * TextRevealByWord - Words reveal with mask animation
 */
export function TextRevealByWord({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`} {...props}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.5,
              delay: delay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

/**
 * GlitchText - Text with glitch effect
 */
export function GlitchText({
  children,
  className = '',
  glitchColors = ['#ff0000', '#00ff00', '#0000ff'],
  ...props
}) {
  const text = typeof children === 'string' ? children : '';

  return (
    <>
      <style>
        {`
          @keyframes glitch-1 {
            0%, 100% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
            20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, -2px); }
            40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 2px); }
            60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
            80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
          }
          @keyframes glitch-2 {
            0%, 100% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
            20% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
            40% { clip-path: inset(40% 0 61% 0); transform: translate(2px, -2px); }
            60% { clip-path: inset(92% 0 1% 0); transform: translate(-2px, 2px); }
            80% { clip-path: inset(43% 0 1% 0); transform: translate(2px, -2px); }
          }
        `}
      </style>
      <span className={`relative inline-block ${className}`} {...props}>
        <span className="relative z-10">{text}</span>
        <span
          className="absolute top-0 left-0 w-full h-full"
          style={{
            color: glitchColors[0],
            animation: 'glitch-1 2s infinite linear alternate-reverse',
            opacity: 0.8,
          }}
          aria-hidden="true"
        >
          {text}
        </span>
        <span
          className="absolute top-0 left-0 w-full h-full"
          style={{
            color: glitchColors[1],
            animation: 'glitch-2 2s infinite linear alternate-reverse',
            opacity: 0.8,
          }}
          aria-hidden="true"
        >
          {text}
        </span>
      </span>
    </>
  );
}

/**
 * ShinyText - Text with moving shine highlight
 */
export function ShinyText({
  children,
  className = '',
  baseColor = '#ffffff',
  shineColor = 'rgba(255, 255, 255, 0.8)',
  duration = 2,
  ...props
}) {
  return (
    <>
      <style>
        {`
          @keyframes shine-move {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
      <span
        className={className}
        style={{
          color: baseColor,
          backgroundImage: `linear-gradient(
            90deg,
            ${baseColor} 0%,
            ${baseColor} 40%,
            ${shineColor} 50%,
            ${baseColor} 60%,
            ${baseColor} 100%
          )`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `shine-move ${duration}s infinite linear`,
        }}
        {...props}
      >
        {children}
      </span>
    </>
  );
}

export default {
  SplitText,
  GradientText,
  TypewriterText,
  WaveText,
  BlurReveal,
  ScrambleText,
  FloatingLetters,
  TextRevealByWord,
  GlitchText,
  ShinyText,
};
