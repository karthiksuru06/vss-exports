/**
 * ProductInfoPanel - Curved liquid-glass panel INSIDE the arc curvature
 *
 * Features:
 * - Curved container with glassmorphism that fits inside arc
 * - Updates when focused product changes with smooth animations
 * - "Order Now" and "Request Quotation" CTAs
 * - Fade + slight slide transitions (heavy underwater feel)
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, FileText, Package, Ruler, MapPin, Waves, Anchor } from 'lucide-react';

/**
 * ProductInfoPanel Component - Curved glass panel inside arc
 *
 * @param {Object} props
 * @param {Object|null} props.product - Currently focused product
 * @param {boolean} props.isActive - Whether a product is currently active (flip card shown)
 * @param {Function} props.onOrderClick - Handler for Order Now button
 * @param {Function} props.onQuoteClick - Handler for Request Quotation button
 * @param {string} props.theme - Current theme ('deep-ocean' or 'surface-light')
 * @param {boolean} props.curvedStyle - Whether to use curved container styling
 * @param {number} props.innerRadius - Inner arc radius for curved positioning
 */
function ProductInfoPanel({
  product,
  isActive,
  onOrderClick,
  onQuoteClick,
  theme = 'deep-ocean',
  curvedStyle = false,
  innerRadius = 280,
}) {
  const isLight = theme === 'surface-light';

  // Heavy underwater animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    exit: { 
      opacity: 0, 
      x: -30,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  // Curved container style to fit inside arc
  const getCurvedContainerStyle = () => {
    if (!curvedStyle) return {};
    
    return {
      // Curved left edge to match arc curvature
      borderRadius: '20px 60px 60px 20px',
      // Position to nestle inside arc
      maxWidth: innerRadius * 0.85,
    };
  };

  return (
    <div 
      className="relative h-full flex items-center justify-center"
      style={{
        padding: curvedStyle ? '20px' : '32px',
      }}
    >
      <AnimatePresence mode="wait">
        {product ? (
          <motion.div
            key={product.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full"
            style={getCurvedContainerStyle()}
          >
            {/* Liquid Glass Card - Curved to fit inside arc */}
            <div
              className="relative overflow-hidden"
              style={{
                background: isLight
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'rgba(10, 37, 64, 0.7)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: isLight
                  ? '1px solid rgba(14, 165, 233, 0.25)'
                  : '1px solid rgba(212, 175, 55, 0.15)',
                boxShadow: isLight
                  ? '0 12px 40px rgba(14, 165, 233, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset -1px 0 0 rgba(255, 255, 255, 0.3)'
                  : '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset -1px 0 0 rgba(212, 175, 55, 0.1)',
                // Curved right edge to match arc
                borderRadius: curvedStyle ? '20px 50px 50px 20px' : '24px',
                padding: curvedStyle ? '24px 28px 24px 24px' : '32px',
              }}
            >
              {/* Decorative curved gradient overlay */}
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, rgba(212, 175, 55, 0.12) 0%, transparent 60%)`,
                  borderRadius: '0 50px 0 0',
                }}
              />

              {/* Curved edge highlight */}
              {curvedStyle && (
                <div
                  className="absolute top-4 right-0 bottom-4 w-1 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.3) 30%, rgba(212, 175, 55, 0.3) 70%, transparent 100%)',
                    borderRadius: '0 4px 4px 0',
                  }}
                />
              )}

              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
                  style={{
                    background: 'rgba(212, 175, 55, 0.2)',
                    color: '#d4af37',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                  }}
                >
                  {product.category}
                </span>
                <span
                  className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full"
                  style={{
                    background: isLight
                      ? 'rgba(14, 165, 233, 0.15)'
                      : 'rgba(14, 165, 233, 0.2)',
                    color: isLight ? '#0369a1' : '#38bdf8',
                    border: '1px solid rgba(14, 165, 233, 0.35)',
                  }}
                >
                  {product.division}
                </span>
              </div>

              {/* Product Name */}
              <h2
                className="font-serif text-2xl font-bold mb-1.5"
                style={{ color: isLight ? '#0a2540' : '#ffffff' }}
              >
                {product.name}
              </h2>

              {/* Scientific Name */}
              <p
                className="text-sm italic mb-5"
                style={{ color: isLight ? '#64748b' : '#94a3b8' }}
              >
                {product.scientificName}
              </p>

              {/* Description */}
              {product.description && (
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: isLight ? '#475569' : '#cbd5e1' }}
                >
                  {product.description}
                </p>
              )}

              {/* Specs Grid - Compact */}
              <div className="space-y-2.5 mb-6">
                {/* Sizes */}
                {product.specs?.sizes && (
                  <div className="flex items-start gap-3">
                    <Ruler
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: '#d4af37' }}
                    />
                    <div>
                      <span
                        className="text-xs uppercase tracking-wide block mb-0.5"
                        style={{ color: '#64748b' }}
                      >
                        Sizes
                      </span>
                      <p
                        className="text-sm font-medium"
                        style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
                      >
                        {product.specs.sizes.join(' • ')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Packing */}
                {product.specs?.packing && (
                  <div className="flex items-start gap-3">
                    <Package
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: '#d4af37' }}
                    />
                    <div>
                      <span
                        className="text-xs uppercase tracking-wide block mb-0.5"
                        style={{ color: '#64748b' }}
                      >
                        Packing
                      </span>
                      <p
                        className="text-sm font-medium"
                        style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
                      >
                        {product.specs.packing.join(' • ')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Origin */}
                {product.specs?.origin && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: '#d4af37' }}
                    />
                    <div>
                      <span
                        className="text-xs uppercase tracking-wide block mb-0.5"
                        style={{ color: '#64748b' }}
                      >
                        Origin
                      </span>
                      <p
                        className="text-sm font-medium"
                        style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
                      >
                        {product.specs.origin}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2.5">
                <motion.button
                  onClick={() => onOrderClick?.(product)}
                  className="w-full py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8962e 100%)',
                    color: '#0a2540',
                    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.4)',
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: '0 6px 24px rgba(212, 175, 55, 0.5)',
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order Now
                </motion.button>

                <motion.button
                  onClick={() => onQuoteClick?.(product)}
                  className="w-full py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                  style={{
                    background: isLight
                      ? 'rgba(14, 165, 233, 0.12)'
                      : 'rgba(255, 255, 255, 0.08)',
                    color: isLight ? '#0369a1' : '#f1f5f9',
                    border: isLight
                      ? '1px solid rgba(14, 165, 233, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  whileHover={{
                    background: isLight
                      ? 'rgba(14, 165, 233, 0.18)'
                      : 'rgba(255, 255, 255, 0.12)',
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-4 h-4" />
                  Request Quotation
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Empty state when no product focused
          <motion.div
            key="empty"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center px-8"
          >
            {/* Curved glass empty state */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: isLight
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(10, 37, 64, 0.4)',
                backdropFilter: 'blur(16px)',
                border: isLight
                  ? '1px solid rgba(14, 165, 233, 0.15)'
                  : '1px solid rgba(212, 175, 55, 0.1)',
                ...getCurvedContainerStyle(),
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                style={{
                  background: isLight
                    ? 'rgba(14, 165, 233, 0.1)'
                    : 'rgba(212, 175, 55, 0.12)',
                  border: isLight
                    ? '1px solid rgba(14, 165, 233, 0.2)'
                    : '1px solid rgba(212, 175, 55, 0.25)',
                }}
              >
                <Anchor
                  className="w-7 h-7"
                  style={{ color: isLight ? '#0ea5e9' : '#d4af37' }}
                />
              </div>
              <p
                className="font-serif text-xl mb-2"
                style={{ color: isLight ? '#0a2540' : '#f1f5f9' }}
              >
                Explore Products
              </p>
              <p
                className="text-sm"
                style={{ color: '#64748b' }}
              >
                Scroll or drag the arc to browse our collection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductInfoPanel;
