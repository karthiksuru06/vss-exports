/**
 * ProductVideoPanel - ZONE 3: Video Display Monitor
 *
 * Features:
 * - Larger rectangular monitor display
 * - Automatic video switch when focused product changes
 * - Smooth crossfade transitions between products
 * - Premium monitor bezel styling
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Monitor, Wifi } from 'lucide-react';

function ProductVideoPanel({
  activeProduct,
  focusedProduct,
  isActive,
  theme = 'deep-ocean'
}) {
  const [currentMedia, setCurrentMedia] = useState(null);
  const [previousMedia, setPreviousMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const isLight = theme === 'surface-light';

  // Display product: active takes priority, otherwise focused
  const displayProduct = activeProduct || focusedProduct;

  // Update media when display product changes (auto-binding)
  useEffect(() => {
    if (displayProduct) {
      // Store previous for crossfade
      setPreviousMedia(currentMedia);
      setCurrentMedia({
        video: displayProduct.video,
        image: displayProduct.image,
        name: displayProduct.name,
        id: displayProduct.id,
      });
      setIsLoading(true);
    } else {
      setPreviousMedia(currentMedia);
      setCurrentMedia(null);
    }
  }, [displayProduct?.id]);

  // Clear previous media after crossfade completes
  useEffect(() => {
    if (previousMedia) {
      const timer = setTimeout(() => setPreviousMedia(null), 800);
      return () => clearTimeout(timer);
    }
  }, [previousMedia]);

  const handleVideoLoad = () => {
    setIsLoading(false);
    // Always play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleImageLoad = () => setIsLoading(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center p-6"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
          : 'linear-gradient(135deg, #051b30 0%, #020617 100%)',
      }}
    >
      {/* Monitor Frame - LARGER, uses more space */}
      <div
        className="relative w-full"
        style={{
          maxWidth: '720px',
          aspectRatio: '16/10',
        }}
      >
        {/* Monitor Bezel */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isLight
              ? 'linear-gradient(145deg, #1e293b, #0f172a)'
              : 'linear-gradient(145deg, #0a2540, #051b30)',
            padding: '14px',
            boxShadow: isLight
              ? '0 30px 60px -15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Screen Area */}
          <div
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{
              background: '#000',
              boxShadow: 'inset 0 2px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Previous media - fading out (crossfade) */}
            <AnimatePresence>
              {previousMedia && (
                <motion.div
                  key={`prev-${previousMedia.id}`}
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {previousMedia.video ? (
                    <video
                      src={previousMedia.video}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={previousMedia.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current media - fading in (crossfade) */}
            <AnimatePresence mode="wait">
              {currentMedia && (
                <motion.div
                  key={`current-${currentMedia.id}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                >
                  {currentMedia.video ? (
                    <video
                      ref={videoRef}
                      src={currentMedia.video}
                      className="w-full h-full object-cover"
                      muted={isMuted}
                      loop
                      playsInline
                      autoPlay
                      onLoadedData={handleVideoLoad}
                    />
                  ) : (
                    <img
                      src={currentMedia.image}
                      alt={currentMedia.name}
                      className="w-full h-full object-cover"
                      onLoad={handleImageLoad}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(180deg, transparent 70%, rgba(0, 0, 0, 0.5) 100%),
                  linear-gradient(0deg, transparent 96%, rgba(255, 255, 255, 0.02) 100%)
                `,
              }}
            />

            {/* Scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px)',
              }}
            />

            {/* Loading indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-10 h-10 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Idle state - no product */}
            {!displayProduct && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <Monitor className="w-16 h-16 mx-auto mb-4 text-ocean-700" />
                  <p className="text-ocean-500 font-serif text-lg">Product Preview</p>
                  <p className="text-ocean-700 text-xs mt-1">Rotate the arc to view products</p>
                </div>
              </motion.div>
            )}

            {/* Video controls overlay */}
            {currentMedia?.video && (
              <motion.div
                className="absolute bottom-4 right-4 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </motion.div>
            )}

            {/* Product name overlay (when not active/clicked) */}
            {displayProduct && !isActive && (
              <motion.div
                className="absolute bottom-4 left-4 right-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={displayProduct.id}
              >
                <p className="text-xs text-ocean-400 uppercase tracking-wider mb-1">
                  {displayProduct.category}
                </p>
                <h3 className="text-white font-serif text-xl">
                  {displayProduct.name}
                </h3>
              </motion.div>
            )}
          </div>
        </div>

        {/* Monitor Stand Base */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          style={{
            width: '35%',
            height: '10px',
            background: isLight
              ? 'linear-gradient(90deg, transparent, #1e293b, transparent)'
              : 'linear-gradient(90deg, transparent, #0a2540, transparent)',
            borderRadius: '0 0 6px 6px',
          }}
        />

        {/* Status LED */}
        <div className="absolute -bottom-1 right-4 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: displayProduct ? '#22c55e' : '#64748b',
              boxShadow: displayProduct ? '0 0 10px rgba(34, 197, 94, 0.6)' : 'none',
            }}
          />
          {displayProduct && <Wifi className="w-3 h-3 text-ocean-500" />}
        </div>
      </div>

      {/* Ambient glow behind monitor */}
      {displayProduct && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.06) 0%, transparent 50%)',
          }}
        />
      )}
    </div>
  );
}

export default ProductVideoPanel;
