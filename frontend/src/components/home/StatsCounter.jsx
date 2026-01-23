import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { STATS } from '../../utils/constants';

const StatItemView = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-ocean-100/10 hover:bg-white/10 transition-colors"
    >
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2 font-mono">
        {inView ? (
          <Counter from={0} to={item.value} duration={2} />
        ) : (
          0
        )}
        <span className="text-ocean-400">{item.suffix}</span>
      </div>
      <div className="text-ocean-100 text-sm sm:text-base font-medium uppercase tracking-wider">
        {item.label}
      </div>
    </motion.div>
  );
};

const Counter = ({ from, to, duration }) => {
  // A simple counter implementation for visual effect
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
};

const StatsCounter = () => {
  return (
    <section className="bg-ocean-900 py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-ocean-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-ocean-300 rounded-full blur-3xl"></div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <StatItemView key={index} item={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
