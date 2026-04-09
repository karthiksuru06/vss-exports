import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Ship, Plane, MapPin, Globe, Box, Anchor, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import cubesTexture from '../../assets/textures/cubes.png';

// Key export destinations... (keep DESTINATIONS and ORIGIN consts same)
const DESTINATIONS = [
  { id: 'usa', nameKey: 'map.dest.usa', x: 180, y: 180, transport: 'sea' },
  { id: 'eu', nameKey: 'map.dest.europe', x: 480, y: 150, transport: 'both' },
  { id: 'japan', nameKey: 'map.dest.japan', x: 820, y: 170, transport: 'air' },
  { id: 'china', nameKey: 'map.dest.china', x: 750, y: 200, transport: 'sea' },
  { id: 'uae', nameKey: 'map.dest.uae', x: 580, y: 240, transport: 'both' },
  { id: 'aus', nameKey: 'map.dest.australia', x: 820, y: 380, transport: 'sea' },
];

const ORIGIN = { x: 620, y: 250, nameKey: 'map.origin' };

const generateCurvedPath = (start, end) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const curveOffset = Math.abs(end.x - start.x) * 0.3;

  return `M ${start.x} ${start.y} Q ${midX} ${midY - curveOffset} ${end.x} ${end.y}`;
};

const ShippingRoute = ({ destination, index, isActive }) => {
  const path = generateCurvedPath(ORIGIN, destination);

  return (
    <g>
      {/* Route path */}
      <motion.path
        d={path}
        fill="none"
        stroke={isActive ? 'url(#routeGradient)' : 'rgba(45, 212, 191, 0.05)'}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray="8 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0.3,
          opacity: isActive ? 1 : 0.3,
        }}
        transition={{
          duration: 1.5,
          delay: index * 0.1,
          ease: 'easeOut',
        }}
      />

      {/* Animated travel indicator */}
      {isActive && (
        <motion.g
          initial={{ "--offset-distance": "0%" }}
          animate={{ "--offset-distance": "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            offsetPath: `path("${path}")`,
            offsetDistance: "var(--offset-distance)",
          }}
        >
          <circle r="4" fill="#2dd4bf" />
          <circle r="8" fill="rgba(45, 212, 191, 0.3)" />
        </motion.g>
      )}
    </g>
  );
};

const DestinationMarker = ({ destination, isActive, onClick, t }) => {
  const Icon = destination.transport === 'air' ? Plane : Ship;

  return (
    <motion.g
      onClick={onClick}
      className="cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.2 }}
    >
      {/* Pulse effect when active */}
      {isActive && (
        <motion.circle
          cx={destination.x}
          cy={destination.y}
          r="20"
          fill="none"
          stroke="rgba(45, 212, 191, 0.5)"
          strokeWidth="2"
          initial={{ r: 8, opacity: 1 }}
          animate={{ r: 30, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Marker circle */}
      <circle
        cx={destination.x}
        cy={destination.y}
        r={isActive ? 10 : 6}
        fill={isActive ? '#2dd4bf' : 'rgba(45, 212, 191, 0.5)'}
        className="transition-all duration-300"
      />

      {/* Transport icon */}
      <foreignObject
        x={destination.x - 8}
        y={destination.y - 8}
        width="16"
        height="16"
      >
        <Icon
          size={16}
          className={`${isActive ? 'text-abyss-950' : 'text-teal-300'}`}
        />
      </foreignObject>

      {/* Label */}
      <text
        x={destination.x}
        y={destination.y + 25}
        textAnchor="middle"
        className={`text-[14px] md:text-xs font-bold fill-current ${isActive ? 'text-white' : 'text-white/60'
          } drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}
      >
        {t(destination.nameKey)}
      </text>
    </motion.g>
  );
};

const GlobalTransportMap = () => {
  const { t } = useTranslation();
  const [activeDestination, setActiveDestination] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  // Auto-rotate through destinations
  useEffect(() => {
    if (!autoRotate || !isInView) return;

    const interval = setInterval(() => {
      setActiveDestination((prev) => {
        const currentIndex = prev ? DESTINATIONS.findIndex((d) => d.id === prev) : -1;
        const nextIndex = (currentIndex + 1) % DESTINATIONS.length;
        return DESTINATIONS[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRotate, isInView]);

  const handleDestinationClick = (id) => {
    setAutoRotate(false);
    setActiveDestination(id);
  };

  const activeData = DESTINATIONS.find((d) => d.id === activeDestination);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-black" />
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url(${cubesTexture})` }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-teal-400/60 text-xs tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
            <Globe size={14} />
            {t('map.badge')}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {t('map.title')} <span className="text-teal-400 italic">{t('map.titleHighlight')}</span>
          </h2>
          <p className="text-ocean-100/60 max-w-xl mx-auto">
            {t('map.description')}
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative glass-underwater rounded-3xl p-8 overflow-hidden border border-teal-500/10 shadow-2xl"
        >
          {/* World Map SVG */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-auto"
            style={{ minHeight: '400px' }}
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#2dd4bf" stopOpacity="1" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="originGlow">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Simplified world map outline */}
            <g className="opacity-20">
              {/* North America */}
              <path
                d="M50,100 L250,80 L280,180 L200,250 L100,230 L60,160 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-teal-400"
              />
              {/* South America */}
              <path
                d="M180,270 L230,260 L250,350 L200,420 L160,380 L170,300 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-teal-400"
              />
              {/* Europe */}
              <path
                d="M420,80 L520,70 L540,130 L500,160 L440,150 L410,120 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-teal-400"
              />
              {/* Africa */}
              <path
                d="M460,180 L540,160 L580,250 L550,350 L480,380 L440,300 L450,220 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-teal-400"
              />
              {/* Asia */}
              <path
                d="M560,80 L850,60 L880,200 L800,280 L650,290 L560,240 L540,150 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-teal-400"
              />
              {/* Australia */}
              <path
                d="M780,340 L880,330 L900,400 L840,430 L770,400 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-teal-400"
              />
            </g>

            {/* Shipping routes */}
            {DESTINATIONS.map((dest, i) => (
              <ShippingRoute
                key={dest.id}
                destination={dest}
                index={i}
                isActive={activeDestination === dest.id}
              />
            ))}

            {/* Origin marker (India) */}
            <g>
              <motion.circle
                cx={ORIGIN.x}
                cy={ORIGIN.y}
                r="25"
                fill="url(#originGlow)"
                animate={{
                  r: [25, 35, 25],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle
                cx={ORIGIN.x}
                cy={ORIGIN.y}
                r="12"
                fill="#2dd4bf"
              />
              <foreignObject
                x={ORIGIN.x - 8}
                y={ORIGIN.y - 8}
                width="16"
                height="16"
              >
                <MapPin size={16} className="text-abyss-950" />
              </foreignObject>
              <text
                x={ORIGIN.x}
                y={ORIGIN.y + 30}
                textAnchor="middle"
                className="text-xs font-bold fill-current text-teal-400"
              >
                {t(ORIGIN.nameKey)}
              </text>
            </g>

            {/* Destination markers */}
            {DESTINATIONS.map((dest) => (
              <DestinationMarker
                key={dest.id}
                destination={dest}
                isActive={activeDestination === dest.id}
                onClick={() => handleDestinationClick(dest.id)}
                t={t}
              />
            ))}
          </svg>

          {/* Active destination info */}
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-80 glass-surface rounded-xl p-5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  {activeData.transport === 'air' ? (
                    <Plane size={20} className="text-teal-400" />
                  ) : activeData.transport === 'both' ? (
                    <div className="flex -space-x-1">
                      <Ship size={16} className="text-teal-400" />
                      <Plane size={16} className="text-ocean-300" />
                    </div>
                  ) : (
                    <Ship size={20} className="text-teal-400" />
                  )}
                  <span className="text-white font-medium">{t(activeData.nameKey)}</span>
                </div>
                <p className="text-ocean-200/60 text-sm">
                  {t(`map.transport.${activeData.transport}`)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transport legend */}
          <div className="absolute top-8 right-8 glass-underwater rounded-lg p-4 hidden md:block border border-white/5">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-ocean-200/60">
                <Ship size={14} className="text-teal-400" />
                <span>{t('map.legend.sea')}</span>
              </div>
              <div className="flex items-center gap-2 text-ocean-200/60">
                <Plane size={14} className="text-ocean-300" />
                <span>{t('map.legend.air')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { labelKey: 'map.stats.countries', value: '50+', icon: Globe },
            { labelKey: 'map.stats.routes', value: '12', icon: Box },
            { labelKey: 'map.stats.transit', value: '3-15 days', icon: Clock },
            { labelKey: 'map.stats.coldChain', value: '100%', icon: CheckCircle },
          ].map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-underwater rounded-xl p-6 text-center group hover:bg-white/5 transition-colors border border-white/5"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-ocean-200/60 uppercase tracking-wider">
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalTransportMap;
