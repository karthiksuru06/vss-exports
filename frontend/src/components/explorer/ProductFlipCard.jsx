/**
 * ProductFlipCard - Glass-style flip card for product details
 *
 * This component displays product information with a 3D flip animation:
 * - Front: Product image and name
 * - Back: Detailed specifications, category, sizes, and CTA
 *
 * Features:
 * - 3D flip animation using CSS transforms
 * - Glass morphism styling
 * - Close button to deactivate
 * - Auto-flips to show back after appearing
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Ruler, ThermometerSnowflake, MapPin } from 'lucide-react';

/**
 * Container animation variants
 * Handles the card appearing/disappearing
 */
const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      opacity: { duration: 0.3 }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

/**
 * ProductFlipCard Component
 *
 * @param {Object} props
 * @param {Object} props.product - Product data
 * @param {boolean} props.isVisible - Whether card is visible
 * @param {Function} props.onClose - Close handler
 */
function ProductFlipCard({ product, isVisible, onClose }) {
  // Track whether card is flipped (showing back)
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip after card appears
  useEffect(() => {
    if (isVisible) {
      // Reset to front when opening
      setIsFlipped(false);
      // Flip to back after a short delay
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, product?.id]);

  // Toggle flip on click (except close button)
  const handleCardClick = (e) => {
    // Don't flip if clicking close button
    if (e.target.closest('.close-button')) return;
    setIsFlipped(!isFlipped);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-midnight-900/60 backdrop-blur-sm pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Card Container - handles perspective */}
          <motion.div
            className="relative perspective-1000 pointer-events-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCardClick}
          >
            {/* Card with 3D rotation */}
            <motion.div
              className="relative preserve-3d cursor-pointer"
              style={{
                width: 380,
                height: 500,
              }}
              animate={{
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 25
              }}
            >
              {/* Front Face - Product Image */}
              <div
                className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="glass-panel w-full h-full rounded-2xl overflow-hidden border border-gold-600/30">
                  {/* Product Image */}
                  <div className="relative h-3/4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-transparent to-transparent" />
                  </div>

                  {/* Front Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-ocean-300 italic">
                      {product.scientificName}
                    </p>
                  </div>

                  {/* Flip hint */}
                  <div className="absolute top-4 right-4 text-xs text-ocean-400">
                    Click to flip
                  </div>
                </div>
              </div>

              {/* Back Face - Product Details */}
              <div
                className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="glass-panel w-full h-full rounded-2xl overflow-hidden border border-gold-600/30">
                  {/* Header */}
                  <div className="relative p-6 pb-4 border-b border-white/10">
                    {/* Close button */}
                    <button
                      className="close-button absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                      {/* Category badge */}
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gold-600/20 text-gold-500 border border-gold-600/30">
                        {product.category}
                      </span>
                      {/* Division badge */}
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-ocean-600/20 text-ocean-400 border border-ocean-600/30">
                        {product.division}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-ocean-300 italic mt-1">
                      {product.scientificName}
                    </p>
                  </div>

                  {/* Specs Content */}
                  <div className="p-6 space-y-4 overflow-auto" style={{ maxHeight: 280 }}>
                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-ocean-200 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {/* Specs Grid */}
                    <div className="space-y-3">
                      {/* Sizes */}
                      {product.specs?.sizes && (
                        <div className="flex items-start gap-3">
                          <Ruler className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-ocean-400 uppercase tracking-wide">Sizes</span>
                            <p className="text-sm text-white mt-0.5">
                              {product.specs.sizes.join(' | ')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Packing */}
                      {product.specs?.packing && (
                        <div className="flex items-start gap-3">
                          <Package className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-ocean-400 uppercase tracking-wide">Packing</span>
                            <p className="text-sm text-white mt-0.5">
                              {product.specs.packing.join(' | ')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Glaze */}
                      {product.specs?.glaze && (
                        <div className="flex items-start gap-3">
                          <ThermometerSnowflake className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-ocean-400 uppercase tracking-wide">Glaze</span>
                            <p className="text-sm text-white mt-0.5">
                              {product.specs.glaze.join(' | ')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Origin */}
                      {product.specs?.origin && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-ocean-400 uppercase tracking-wide">Origin</span>
                            <p className="text-sm text-white mt-0.5">
                              {product.specs.origin}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Processing Types */}
                      {product.processingType && product.processingType.length > 0 && (
                        <div className="pt-2">
                          <span className="text-xs text-ocean-400 uppercase tracking-wide block mb-2">
                            Processing Options
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {product.processingType.map((type) => (
                              <span
                                key={type}
                                className="px-2 py-1 text-xs rounded bg-white/5 text-ocean-200 border border-white/10"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
                    <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-gold-600 to-gold-700 text-midnight-900 font-semibold text-sm hover:from-gold-500 hover:to-gold-600 transition-all shadow-lg shadow-gold-600/20">
                      Request Spec Sheet
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Click to flip hint */}
            <motion.p
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-ocean-400 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5 }}
            >
              Click card to flip
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductFlipCard;
