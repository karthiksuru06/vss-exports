/**
 * ProductArcWheel - Marine Control Arc Selector
 *
 * LAYOUT:
 * - DESKTOP: Arc positioned LEFT, products on right semicircle, info inside arc
 * - MOBILE: Arc positioned at BOTTOM, products curve UPWARD from bottom edge
 */

import React, { useMemo } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { Ruler, Package, MapPin, ShoppingCart, FileText, Settings, Award } from 'lucide-react';
import useArcRotation from '../../hooks/useArcRotation';

const DEG_TO_RAD = Math.PI / 180;

/**
 * Get localized product info with fallback to English
 */
const getLocalizedInfo = (product, lang = 'en') => {
  if (product?.info?.[lang]) {
    return product.info[lang];
  }
  if (product?.info?.en) {
    return product.info.en;
  }
  return {
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    sizes: product?.specs?.sizes?.[0] || '',
    origin: product?.specs?.origin || '',
    processing: product?.processingType?.join(', ') || '',
    packaging: product?.specs?.packing?.join(', ') || '',
    certification: product?.specs?.certifications?.join(', ') || ''
  };
};

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
  currentLanguage = 'en',
  isMobile = false,
}) {
  const isLight = theme === 'surface-light';
  const productCount = products.length;
  const trackRadius = (outerRadius + innerRadius) / 2;

  const { rotation, handlers, anglePerProduct, snapToIndex } = useArcRotation({
    productCount,
    isLocked,
    onFocusChange,
    isMobile,
  });

  const focusedProduct = focusedIndex !== null && focusedIndex < productCount
    ? products[focusedIndex]
    : null;

  /**
   * Calculate product position on arc
   * DESKTOP: Products on right semicircle (focus at 0° = right side)
   * MOBILE: Products on TOP semicircle curving upward (focus at 90° = top)
   */
  const getProductPosition = (index, rot) => {
    // MOBILE: Start from 0° (right), products spread across top semicircle
    // Focus position at 90° (top of circle)
    // DESKTOP: Start from -90° (top), products on right semicircle
    // Focus position at 0° (right side)
    const startAngle = isMobile ? 0 : -90;
    const baseAngle = startAngle + index * anglePerProduct;
    const currentAngle = baseAngle + rot;

    let normalizedAngle = currentAngle % 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;
    if (normalizedAngle < -180) normalizedAngle += 360;

    const angleRad = currentAngle * DEG_TO_RAD;
    const x = trackRadius * Math.cos(angleRad);
    const y = -trackRadius * Math.sin(angleRad); // Negative because screen Y is inverted

    // Distance from focus position
    // MOBILE: focus at 90° (top)
    // DESKTOP: focus at 0° (right)
    const focusAngle = isMobile ? 90 : 0;
    let distanceFromCenter = Math.abs(normalizedAngle - focusAngle);
    if (distanceFromCenter > 180) distanceFromCenter = 360 - distanceFromCenter;

    const isFocused = distanceFromCenter < (anglePerProduct / 2 + 5);
    const opacity = Math.max(0.3, 1 - (distanceFromCenter / 100) * 0.7);
    const scale = Math.max(0.6, 1 - (distanceFromCenter / 100) * 0.4);
    const zIndex = Math.round(100 - distanceFromCenter);

    // Visibility: show products within the visible arc range
    const visible = isMobile
      ? (normalizedAngle >= -15 && normalizedAngle <= 195) // Top semicircle (0° to 180°)
      : distanceFromCenter <= 105; // Right semicircle

    return { x, y, opacity, scale, zIndex, isFocused, visible, normalizedAngle };
  };

  const arcGuides = useMemo(() => [
    { radius: outerRadius, opacity: 0.3, width: isMobile ? 1.5 : 2.5 },
    { radius: innerRadius, opacity: 0.25, width: isMobile ? 1.5 : 2.5 },
    { radius: trackRadius, opacity: 0.08, width: 1, dashed: true },
  ], [outerRadius, innerRadius, trackRadius, isMobile]);

  // Clip path for showing correct semicircle
  // MOBILE: Top half (products curve upward from bottom)
  // DESKTOP: Right half
  const arcClipPath = isMobile
    ? 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)' // Top half
    : 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)'; // Right half

  return (
    <div
      className="relative w-full h-full"
      style={{ touchAction: 'none', cursor: isLocked ? 'default' : 'grab' }}
      {...handlers}
    >
      {/* Arc Center Position */}
      <div
        className="absolute"
        style={isMobile
          ? {
              // MOBILE: Arc center at bottom of container
              // Products will curve UPWARD from this point
              left: '50%',
              bottom: '-10px',
              transform: 'translateX(-50%)'
            }
          : {
              // DESKTOP: Arc center on left side, vertically centered
              left: '38%',
              top: '50%'
            }
        }
      >
        {/* Arc Guides - Circular rings */}
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
              clipPath: arcClipPath,
            }}
          />
        ))}

        {/* Track fill - subtle gradient */}
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
              rgba(212, 175, 55, 0.02) ${(innerRadius / outerRadius) * 100}%,
              rgba(212, 175, 55, 0.04) ${(trackRadius / outerRadius) * 100}%,
              rgba(212, 175, 55, 0.02) 100%
            )`,
            clipPath: arcClipPath,
          }}
        />

        {/* Focus indicator */}
        <div
          className="absolute pointer-events-none"
          style={isMobile
            ? {
                // MOBILE: Indicator at TOP of arc (focus position)
                left: '50%',
                top: -trackRadius,
                width: 40,
                height: 3,
                marginTop: -1.5,
                marginLeft: -20,
                background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.9) 50%, transparent 100%)',
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
              }
            : {
                // DESKTOP: Indicator at RIGHT of arc
                left: trackRadius,
                top: '50%',
                width: 4,
                height: 45,
                marginTop: -22,
                marginLeft: -2,
                background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.8) 50%, transparent 100%)',
                borderRadius: 2,
                boxShadow: '0 0 18px rgba(212, 175, 55, 0.5)',
              }
          }
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
            currentLanguage={currentLanguage}
            isMobile={isMobile}
          />
        ))}

        {/* INFO INSIDE THE CIRCLE - Desktop only */}
        {!isMobile && (
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
              {focusedProduct && (() => {
                const info = getLocalizedInfo(focusedProduct, currentLanguage);
                return (
                  <motion.div
                    key={`${focusedProduct.id}-${currentLanguage}`}
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
                      {info.category}
                    </span>

                    {/* Name */}
                    <h2
                      className="font-serif text-xl font-bold mb-0.5"
                      style={{ color: isLight ? '#0a2540' : '#ffffff' }}
                    >
                      {info.name}
                    </h2>

                    {/* Scientific name */}
                    <p
                      className="text-xs italic mb-2"
                      style={{ color: isLight ? '#64748b' : '#94a3b8' }}
                    >
                      {focusedProduct.scientificName}
                    </p>

                    {/* Description */}
                    {info.description && (
                      <p
                        className="text-xs mb-2 line-clamp-2"
                        style={{ color: isLight ? '#475569' : '#cbd5e1' }}
                      >
                        {info.description}
                      </p>
                    )}

                    {/* Specs */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-1.5">
                      {info.sizes && (
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            color: isLight ? '#0f172a' : '#f1f5f9',
                          }}
                        >
                          <Ruler className="w-3 h-3" style={{ color: '#d4af37' }} />
                          {info.sizes}
                        </div>
                      )}
                      {info.origin && (
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            color: isLight ? '#0f172a' : '#f1f5f9',
                          }}
                        >
                          <MapPin className="w-3 h-3" style={{ color: '#d4af37' }} />
                          {info.origin}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-1.5 mb-1.5">
                      {info.processing && (
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            color: isLight ? '#0f172a' : '#f1f5f9',
                          }}
                        >
                          <Settings className="w-3 h-3" style={{ color: '#3b82f6' }} />
                          {info.processing}
                        </div>
                      )}
                      {info.packaging && (
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            color: isLight ? '#0f172a' : '#f1f5f9',
                          }}
                        >
                          <Package className="w-3 h-3" style={{ color: '#22c55e' }} />
                          {info.packaging}
                        </div>
                      )}
                    </div>

                    {info.certification && (
                      <div className="flex justify-center mb-3">
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(168, 85, 247, 0.1)',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            color: isLight ? '#0f172a' : '#f1f5f9',
                          }}
                        >
                          <Award className="w-3 h-3" style={{ color: '#a855f7' }} />
                          {info.certification}
                        </div>
                      </div>
                    )}

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
                        {currentLanguage === 'hi' ? 'ऑर्डर' : currentLanguage === 'zh' ? '订购' : currentLanguage === 'ja' ? '注文' : 'Order'}
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
                        {currentLanguage === 'hi' ? 'कोटेशन' : currentLanguage === 'zh' ? '报价' : currentLanguage === 'ja' ? '見積り' : 'Quote'}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Instructions - Desktop only */}
      {!isLocked && !isMobile && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ bottom: 4, left: '38%', transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-xs" style={{ color: '#94a3b8' }}>
            Scroll to browse • Click to select
          </p>
        </motion.div>
      )}

      {/* Mobile swipe hint - subtle text at top */}
      {!isLocked && isMobile && (
        <motion.div
          className="absolute top-2 left-0 right-0 text-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          <p className="text-[10px] tracking-wide" style={{ color: '#94a3b8' }}>
            ← Swipe to browse →
          </p>
        </motion.div>
      )}
    </div>
  );
}

/**
 * ProductOnArc - Product circle positioned on the arc
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
  currentLanguage = 'en',
  isMobile = false,
}) {
  const position = useTransform(rotation, (rot) => getPosition(index, rot));

  const x = useTransform(position, (p) => p.x);
  const y = useTransform(position, (p) => p.y);
  const opacity = useTransform(position, (p) => p.opacity);
  const scale = useTransform(position, (p) => p.scale);
  const zIndex = useTransform(position, (p) => p.zIndex);
  const visible = useTransform(position, (p) => p.visible);

  const isFocused = focusedIndex === index;
  const size = isFocused ? itemSize * 1.3 : itemSize * 0.75;

  const handlePointerDown = (e) => {
    e.stopPropagation();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFocused) {
      onProductClick?.(product);
    } else {
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
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      whileHover={{ scale: isFocused ? 1.08 : 1.05 }}
    >
      {/* Glow effect for focused product */}
      {isFocused && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size + (isMobile ? 14 : 22),
            height: size + (isMobile ? 14 : 22),
            left: isMobile ? -7 : -11,
            top: isMobile ? -7 : -11,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Product image */}
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: isFocused
            ? `${isMobile ? 2.5 : 4}px solid #d4af37`
            : '2px solid rgba(212, 175, 55, 0.2)',
          boxShadow: isFocused
            ? '0 0 30px rgba(212, 175, 55, 0.5), inset 0 0 12px rgba(212, 175, 55, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.4)',
          filter: isFocused ? 'brightness(1.1)' : 'brightness(0.55)',
          transition: 'all 0.35s ease',
          background: 'linear-gradient(135deg, #0a2540 0%, #1e3a5f 100%)',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            // Fallback to placeholder on error
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=400&auto=format&fit=crop';
          }}
        />
      </div>

      {/* Name label - Desktop only */}
      {isFocused && !isMobile && (
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
            {getLocalizedInfo(product, currentLanguage).name}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ProductArcWheel;
