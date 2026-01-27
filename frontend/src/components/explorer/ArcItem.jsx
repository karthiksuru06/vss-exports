/**
 * ArcItem - Individual product thumbnail on the rotating arc
 *
 * Design requirements:
 * - Fully CIRCULAR thumbnails only (no square background)
 * - Focused product: thick gold circular border + soft glow + scale up (LARGER)
 * - Non-focused: smaller, lower brightness, but CLICKABLE to snap to center
 * - Heavy underwater motion (no bouncy/snappy easing)
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animation variants with HEAVY underwater feel
 * No bouncy or snappy easing - prioritize inertia and smooth deceleration
 */
const itemVariants = {
  idle: {
    scale: 1,
    y: 0,
    zIndex: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out
    }
  },
  focused: {
    scale: 1.35,
    y: 0,
    zIndex: 20,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  active: {
    scale: 1.5,
    y: -10,
    zIndex: 50,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
};

/**
 * ArcItem Component
 */
function ArcItem({
  product,
  index,
  isFocused,
  isActive,
  onClick,
  onSnapToIndex,
  size = 100,
  style = {}
}) {
  const getState = () => {
    if (isActive) return "active";
    if (isFocused) return "focused";
    return "idle";
  };

  const currentState = getState();

  const handleClick = (e) => {
    e.stopPropagation();

    if (isFocused && onClick) {
      // Focused product - open details
      onClick(product);
    } else if (!isFocused && onSnapToIndex) {
      // Non-focused product - snap to center
      onSnapToIndex(index);
    }
  };

  // Dynamic sizing - focused product is bigger
  const displaySize = isFocused || isActive ? size * 1.15 : size * 0.75;

  return (
    <motion.div
      className="absolute"
      style={{
        width: displaySize,
        height: displaySize,
        ...style,
        marginLeft: -displaySize / 2,
        marginTop: -displaySize / 2,
        cursor: 'pointer', // All items are clickable
      }}
      variants={itemVariants}
      animate={currentState}
      whileHover={{
        scale: isFocused ? 1.4 : 1.1,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }}
      onClick={handleClick}
    >
      {/* Outer glow ring - ONLY visible when focused or active */}
      {(isFocused || isActive) && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: displaySize + 30,
            height: displaySize + 30,
            left: -15,
            top: -15,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.2) 40%, transparent 70%)',
            filter: 'blur(12px)',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      )}

      {/* Main circular thumbnail - NO square background */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          // Thick gold border for focused, thin subtle border for others
          border: isFocused || isActive
            ? '5px solid #d4af37'
            : '2px solid rgba(212, 175, 55, 0.25)',
          // Gold glow shadow for focused items
          boxShadow: isFocused || isActive
            ? '0 0 50px rgba(212, 175, 55, 0.6), 0 0 100px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)',
          // Brightness filter for non-focused items (dimmer)
          filter: isFocused || isActive
            ? 'brightness(1.2) saturate(1.15)'
            : 'brightness(0.5) saturate(0.65)',
          // Smooth underwater transitions
          transition: 'border 0.5s ease, box-shadow 0.5s ease, filter 0.5s ease',
        }}
      >
        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Subtle inner shadow for depth */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Highlight rim on focused */}
        {(isFocused || isActive) && (
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)',
            }}
          />
        )}
      </div>

      {/* Product name label - only visible when focused or active */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
        style={{
          top: displaySize + 14,
        }}
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: isFocused || isActive ? 1 : 0,
          y: isFocused || isActive ? 0 : -8,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span
          className="text-sm font-semibold px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(10, 37, 64, 0.9)',
            color: '#d4af37',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {product.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default ArcItem;
