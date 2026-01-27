/**
 * ProductArcWheel - Marine Control Arc Selector
 *
 * LAYOUT:
 * - Arc positioned towards LEFT side
 * - Product info displayed INSIDE the arc circle (no separate container)
 * - Products on the arc track between two concentric arcs
 * - Click any product to rotate wheel and bring it to center
 */

import React, { useMemo } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Ruler, Package, MapPin, ShoppingCart, FileText } from 'lucide-react';
import useArcRotation from '../../hooks/useArcRotation';

const DEG_TO_RAD = Math.PI / 180;
const mod = (n, m) => ((n % m) + m) % m;

function ProductArcWheel({
  products,
  focusedIndex,
  isLocked,
  onFocusChange,
  onProductClick,
  onOrderClick,
  onQuoteClick,
  outerRadius = 380,
  innerRadius = 240,
  itemSize = 80,
  theme = 'deep-ocean',
}) {
  const isLight = theme === 'surface-light';
  const productCount = products.length;
  const trackRadius = (outerRadius + innerRadius) / 2;

  const { rotation, handlers, anglePerProduct, snapToIndex } = useArcRotation({
    productCount,
    isLocked,
    onFocusChange,
  });

  const focusedProduct = focusedIndex !== null && focusedIndex < productCount
    ? products[focusedIndex]
    : null;

  /**
   * Calculate product position on arc
   */
  const getProductPosition = (index, rot) => {
    const baseAngle = -90 + index * anglePerProduct;
    const currentAngle = baseAngle + rot;

    let normalizedAngle = currentAngle % 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;
    if (normalizedAngle < -180) normalizedAngle += 360;

    const angleRad = currentAngle * DEG_TO_RAD;
    const x = trackRadius * Math.cos(angleRad);
    const y = -trackRadius * Math.sin(angleRad);

    const distanceFromCenter = Math.abs(normalizedAngle);
    const isFocused = distanceFromCenter < (anglePerProduct / 2 + 5);
    const opacity = Math.max(0.35, 1 - (distanceFromCenter / 100) * 0.65);
    const scale = Math.max(0.65, 1 - (distanceFromCenter / 100) * 0.35);
    const zIndex = Math.round(100 - distanceFromCenter);
    const visible = distanceFromCenter <= 105;

    return { x, y, opacity, scale, zIndex, isFocused, visible, normalizedAngle };
  };

  const arcGuides = useMemo(() => [
    { radius: outerRadius, opacity: 0.35, width: 2.5 },
    { radius: innerRadius, opacity: 0.3, width: 2.5 },
    { radius: trackRadius, opacity: 0.1, width: 1, dashed: true },
  ], [outerRadius, innerRadius, trackRadius]);

  return (
    <div
      className="relative w-full h-full"
      style={{ touchAction: 'none', cursor: isLocked ? 'default' : 'grab' }}
      {...handlers}
    >
      {/* Arc Center - Positioned LEFT */}
      <div
        className="absolute"
        style={{ left: '38%', top: '50%' }}
      >
        {/* Arc Guides */}
        {arcGuides.map((guide, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: guide.radius * 2,
              height: guide.radius * 2,
              marginTop: -guide.radius,
              marginLeft: -guide.radius,
              borderRadius: '50%',
              border: `${guide.width}px ${guide.dashed ? 'dashed' : 'solid'} rgba(212, 175, 55, ${guide.opacity})`,
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
            }}
          />
        ))}

        {/* Track fill */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: outerRadius * 2,
            height: outerRadius * 2,
            marginTop: -outerRadius,
            marginLeft: -outerRadius,
            borderRadius: '50%',
            background: `radial-gradient(circle,
              transparent ${(innerRadius / outerRadius) * 100 - 1}%,
              rgba(212, 175, 55, 0.03) ${(innerRadius / outerRadius) * 100}%,
              rgba(212, 175, 55, 0.05) ${(trackRadius / outerRadius) * 100}%,
              rgba(212, 175, 55, 0.03) 100%
            )`,
            clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
          }}
        />

        {/* Center focus indicator */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: trackRadius,
            top: '50%',
            width: 4,
            height: 45,
            marginTop: -22,
            marginLeft: -2,
            background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.8) 50%, transparent 100%)',
            borderRadius: 2,
            boxShadow: '0 0 18px rgba(212, 175, 55, 0.5)',
          }}
        />

        {/* Products on arc */}
        {products.map((product, index) => (
          <ProductOnArc
            key={product.id}
            product={product}
            index={index}
            rotation={rotation}
            getPosition={getProductPosition}
            focusedIndex={focusedIndex}
            itemSize={itemSize}
            onProductClick={onProductClick}
            onSnapToIndex={snapToIndex}
          />
        ))}

        {/* INFO INSIDE THE CIRCLE - No separate container */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: innerRadius * 0.9,
            marginLeft: -(innerRadius * 0.45),
          }}
        >
          <AnimatePresence mode="wait">
            {focusedProduct && (
              <motion.div
                key={focusedProduct.id}
                className="text-center pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {/* Category */}
                <span
                  className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-2"
                  style={{
                    background: 'rgba(212, 175, 55, 0.2)',
                    color: '#d4af37',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                  }}
                >
                  {focusedProduct.category}
                </span>

                {/* Name */}
                <h2
                  className="font-serif text-xl font-bold mb-0.5"
                  style={{ color: isLight ? '#0a2540' : '#ffffff' }}
                >
                  {focusedProduct.name}
                </h2>

                {/* Scientific name */}
                <p
                  className="text-xs italic mb-3"
                  style={{ color: isLight ? '#64748b' : '#94a3b8' }}
                >
                  {focusedProduct.scientificName}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {focusedProduct.specs?.sizes && (
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        color: isLight ? '#0f172a' : '#f1f5f9',
                      }}
                    >
                      <Ruler className="w-3 h-3" style={{ color: '#d4af37' }} />
                      {focusedProduct.specs.sizes[0]}
                    </div>
                  )}
                  {focusedProduct.specs?.origin && (
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        color: isLight ? '#0f172a' : '#f1f5f9',
                      }}
                    >
                      <MapPin className="w-3 h-3" style={{ color: '#d4af37' }} />
                      {focusedProduct.specs.origin}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex justify-center gap-2">
                  <motion.button
                    onClick={() => onOrderClick?.(focusedProduct)}
                    className="py-1.5 px-3 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37, #b8962e)',
                      color: '#0a2540',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Order
                  </motion.button>
                  <motion.button
                    onClick={() => onQuoteClick?.(focusedProduct)}
                    className="py-1.5 px-3 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: isLight ? '#0369a1' : '#f1f5f9',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText className="w-3 h-3" />
                    Quote
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Instructions */}
      {!isLocked && (
        <motion.div
          className="absolute bottom-4 pointer-events-none"
          style={{ left: '38%', transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-xs" style={{ color: '#94a3b8' }}>
            Scroll to browse products • Click to select
          </p>
        </motion.div>
      )}
    </div>
  );
}

/**
 * ProductOnArc - Product circle on the arc
 */
function ProductOnArc({
  product,
  index,
  rotation,
  getPosition,
  focusedIndex,
  itemSize,
  onProductClick,
  onSnapToIndex,
}) {
  const position = useTransform(rotation, (rot) => getPosition(index, rot));

  const x = useTransform(position, (p) => p.x);
  const y = useTransform(position, (p) => p.y);
  const opacity = useTransform(position, (p) => p.opacity);
  const scale = useTransform(position, (p) => p.scale);
  const zIndex = useTransform(position, (p) => p.zIndex);
  const visible = useTransform(position, (p) => p.visible);

  const isFocused = focusedIndex === index;
  const size = isFocused ? itemSize * 1.25 : itemSize * 0.8;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFocused) {
      onProductClick?.(product);
    } else {
      // Click rotates wheel to this product
      onSnapToIndex?.(index);
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        opacity,
        scale,
        zIndex,
        display: useTransform(visible, (v) => v ? 'block' : 'none'),
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        cursor: 'pointer',
      }}
      onClick={handleClick}
      whileHover={{ scale: isFocused ? 1.08 : 1.05 }}
    >
      {/* Glow for focused */}
      {isFocused && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size + 22,
            height: size + 22,
            left: -11,
            top: -11,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Image */}
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: isFocused ? '4px solid #d4af37' : '2px solid rgba(212, 175, 55, 0.2)',
          boxShadow: isFocused
            ? '0 0 35px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.4)',
          filter: isFocused ? 'brightness(1.1)' : 'brightness(0.5)',
          transition: 'all 0.4s ease',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Name label */}
      {isFocused && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{ top: size + 8 }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(10, 37, 64, 0.9)',
              color: '#d4af37',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            {product.name}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ProductArcWheel;
